from flask import Flask, jsonify, request, Response
import requests, json
import jwt, datetime
from functools import wraps
from flask_cors import CORS
import hashlib
from pyisemail import is_email 
from sqlalchemy import create_engine, text
import mysql.connector

app = Flask(__name__)

CORS(app)  
app.config['SECRET_KEY'] = 'test'        
SECRET_KEY = 'test'        

# engine = create_engine('mysql+pymysql://CSCDGroup3:CSCDGroup3@127.0.0.1:3306/groupcscd611')
# mysql+pymysql://username:password0@23.229.232.201:3306/dbnaes
engine = create_engine('mysql+pymysql://CSCDGroup3:CSCDGroup3@127.0.0.1:3306/db_test_001')
connection = mysql.connector.connect(host='127.0.0.1',  database='db_test_001', user='CSCDGroup3', password='CSCDGroup3')

    
id_init_set = 1000
    
@app.route('/login', methods=['POST'])
def get_token():
    request_data = request.get_json()
    username = request_data['employeeEmailAddress']
    password = hashlib.sha256(request_data['password'].encode()).hexdigest()
    with engine.connect() as conn:
        result = conn.execute(text("SELECT employeeNo, employeeName, employeeStreet, employeeCity, employeeZipCode, \
                                   employeeFaxNo, employeeEmailAddress, employeeWebAddress, contactName, contactTelNo, \
                                   contactFaxNo, contactEmailAddress, departmentNo, emp_created_at, emp_updated_at \
                                   FROM employee WHERE employee.password = '" + str(password) + \
                                   "' AND employee.employeeEmailAddress = '" + str(username) + "'" ))
        result_list = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
        match = result_list[0]
    if match:
        expiration_date = datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        print(expiration_date)
        token = jwt.encode({'exp': expiration_date}, app.config['SECRET_KEY'], algorithm='HS256')

        # print(token)
        print(jsonify(match))

        objData = { 
        	"employeeNo": match["employeeNo"], 
        	"employeeName": match["employeeName"], 
        	"employeeCity": match["employeeCity"], 
        	"employeeFaxNo": match["employeeFaxNo"], 
        	"employeeWebAddress": match["employeeWebAddress"], 
        	"contactName": match["contactName"], 
        	"contactTelNo": match["contactTelNo"], 
        	"contactFaxNo": match["contactFaxNo"], 
        	"contactEmailAddress": match["contactEmailAddress"], 
        	"departmentNo": match["departmentNo"], 
        	"emp_created_at": match["emp_created_at"],
        	"emp_updated_at": match["emp_updated_at"]	
        }
        #return jsonify({ "user": objData, "token": token.decode("utf-8") })
        return jsonify({ "user": objData, "access_key": jwt.decode( token.decode("utf-8"), app.config['SECRET_KEY'], algorithms=['HS256'] ), "token": token.decode("utf-8")  })

    else:
        return Response('', 401, mimetype='application/json')
    
def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        
        token = request.headers['Token']
        #print(request.headers['Token'])
        #print(token)
        try:
            #print(">>>", request.headers['Token'])
            jwt.decode( token,  app.config['SECRET_KEY'], algorithms=['HS256'] )
            return f(*args, **kwargs)
        except Exception as e:
            #print("exception ", str(e))
            return jsonify({'error': 'Invalid Token', "status": 301 })
    return wrapper
 
    
def generateID(table, column):
    with engine.connect() as conn:
        result = conn.execute(text("SELECT COUNT(" + column +") AS count FROM " + table + ""))
        result_list = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
        return (result_list[0]["count"] + id_init_set )

#password = hashlib.sha256(request_data['password'].encode()).hexdigest()


# Define the Python function that calls the stored procedure
def call_sp():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM employee" ))
        result_list = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
        # param2 = conn.execute("SELECT @param1").fetchone()[0]
        return (result_list[0])

def call_employee(requestObject):
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM employee WHERE employeeNo = " + str(requestObject["employeeNo"]) ))
        result_list = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
        if result_list:
            return (result_list[0])
        else:
            return {}

def call_asset(requestObject):
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM asset WHERE assetNo = " + str(requestObject["assetNo"]) ))
        result_list = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
        if result_list:
            return (result_list[0])
        else:
            return {}


def call_asset_all():
    with engine.connect() as conn:
        try:
            result = conn.execute(text("SELECT * FROM asset"))
            result_list = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
            print(json.dumps(result_list, indent=4, sort_keys=True, default=str))
            if result_list:
                return json.dumps(result_list, default=str)
            else:
                return {}
        except Exception as e:
            return str(e)
        
# employee creation sp
def create_emp_call_sp(requestObject):
    cursor = connection.cursor()
    password = hashlib.sha256(requestObject['password'].encode()).hexdigest()
    employeeNo = generateID("employee", "employeeNo")
    try:
        cursor.callproc( "add_employee_procedure", \
                        (employeeNo, password, requestObject["employeeName"], requestObject["employeeStreet"], \
                         requestObject["employeeCity"], requestObject["employeeZipCode"], requestObject["employeeFaxNo"], \
                         requestObject["employeeEmailAddress"], requestObject["employeeWebAddress"], requestObject["contactName"], \
                         requestObject["contactTelNo"], requestObject["contactFaxNo"], requestObject["contactEmailAddress"], \
                         requestObject["departmentNo"], datetime.datetime.utcnow(), datetime.datetime.utcnow() ) )
        connection.commit()
        cursor.close()
        return requestObject
    except:
        return "failed"

# add asset
def add_asset_call_sp(requestObject):
    assetNo = generateID("asset", "assetNo")
    print(">>> ", requestObject)
    cursor = connection.cursor()
    try:
        cursor.callproc( "add_asset_procedure", \
                        ( assetNo, requestObject["assetDescription"], requestObject["dateAcquired"], \
                         requestObject["purchasedPrice"], requestObject["currentValue"], requestObject["dateSold"], \
                         requestObject["nextMaintenceDate"], requestObject["employeeNo"], requestObject["assetCategoryNo"], \
                         requestObject["statusNo"], datetime.datetime.utcnow() ) )
        connection.commit()
        cursor.close()
        return requestObject
    except:
        return "failed"
    
# updae asset
def update_asset_call_sp(requestObject):
    cursor = connection.cursor()
    try:
        cursor.callproc( "update_asset_procedure", \
                        ( requestObject["assetNo"], requestObject["assetDescription"], requestObject["dateAcquired"], \
                         requestObject["purchasedPrice"], requestObject["currentValue"], requestObject["dateSold"], \
                         requestObject["nextMaintenceDate"], requestObject["employeeNo"], requestObject["assetCategoryNo"], \
                         requestObject["statusNo"], datetime.datetime.utcnow() ) )
        connection.commit()
        cursor.close()
        return requestObject
    except:
        return "failed"
    
# delete an asset
def delete_asset_call_sp(requestObject):
    cursor = connection.cursor()
    try:
        cursor.callproc( "delete_asset_procedure", ( requestObject["assetNo"],  ) )
        connection.commit()
        cursor.close()
        return requestObject
    except Exception as e:
        return str(e)

@app.route('/employee', methods=['POST', 'GET', 'PUT'])
def employee():
    request_data = request.get_json()
    if(request.method == "GET"):
        result = call_sp()
        if(result):
            return jsonify({'result': result})
        else:
            return jsonify({'result': []})
    if(request.method == "POST"):
        result = create_emp_call_sp(request_data)
        if(result):
            return jsonify({'result': result})
        else:
            return jsonify({'result': []})
            result = update_asset_call_sp(request_data)

@app.route('/asset', methods=['POST', 'GET', 'PUT', 'DELETE'])
def asset():
    request_data = request.get_json()
    if(request.method == "GET"):
        result = call_asset_all()
        if(result):
            return {'result': json.loads(result) }
        else:
            return jsonify({'result': []})
        
    if(request.method == "POST"):
        result = add_asset_call_sp(request_data)
        if(result):
            return jsonify({'result': result})
        else:
            return jsonify({'result': []})
        
    if(request.method == "PUT"):
        result = update_asset_call_sp(request_data)
        if(result):
            return jsonify({'result': result})
        else:
            return jsonify({'result': []})
        
    if(request.method == "DELETE"):
        result = delete_asset_call_sp(request_data)
        if(result):
            return jsonify({'result': result})
        else:
            return jsonify({'result': []})

# Define a Flask route that calls the Python function and returns the result
@app.route('/myroute/<int:param1>')
def my_route(param1):
    result = call_sp(param1)
    if(result):
        return jsonify({'result': result})
    else:
        return jsonify({'result': []})


# cursor 
@app.route('/cursor/<int:param1>')
def my_cursor(param1):
    result_list = {}
    with engine.connect() as conn:
        result = conn.execute(text( "select * from account, user where user.user_id = account.user_id and user.user_id = " + str(param1) ) )
        result_list = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
        
        # cursor = conn.cursor()
        # print(result_list)
    if result_list:
        return jsonify({'result': result_list })
    else:
        return jsonify({'result': {} })

    

if __name__ == "__main__":
  app.run()
