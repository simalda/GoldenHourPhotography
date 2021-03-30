from pymongo import MongoClient
from pprint import pprint
from Image import *
from TimeUnit import *
import datetime
import time
import ConfigProvider  

from passlib.hash import sha256_crypt
from bson import ObjectId


class DataAccess:
    def __init__(self):
        self.client = MongoClient(ConfigProvider.DBURL) #DBURL
        self.mydb = self.client[ConfigProvider.DBNAME] #DBNAME
    

    def check_user(self, user, psw):
        self.collection = self.mydb['adminUser'] 
        user_data_from_d_b = self.collection.find_one({'username': user})
        password = sha256_crypt.hash(psw)
        password2 = sha256_crypt.hash(psw)
        print(password)
        print(password2)
        print(sha256_crypt.verify(password, password2))
        if user_data_from_d_b['username'] == user and user_data_from_d_b['password'] == psw:
            guid = self.start_session(user)
            return {"result": True, "id": guid}
        else:
            return False

    def start_session(self, user):
        self.collection = self.mydb['session'] 
        guid = self.collection.insert_one({"name":user, "startDate": datetime.datetime.now(),"endDate":None}).inserted_id 
        return str(guid)

    def end_session(self, id):
        self.collection = self.mydb['session'] 
        myquery = { "_id": ObjectId(id)}
        newvalues = { "$set": { "endDate":datetime.datetime.now()} }

        self.collection.update_one(myquery, newvalues)

    def get_all_image_types(self):
        self.collection = self.mydb['imageTypes']
        types = []
        for image_type in self.collection.find():
            types.append(image_type["type"])
        return types

    def get_all_event_types(self):
        self.collection = self.mydb['eventTypes']
        types = []
        for x in self.collection.find():
            types.append(x["type"])
        return types

    
    def get_all_locations_info(self):
        self.collection = self.mydb['locationInfo']
        locations = []
        result = self.collection.find( )
        for locaion in result:
            locations.append({
            "name":  locaion["name"],
            "longtitude": locaion["longtitude"],
            "latitude" : locaion["latitude"]
        })
        return locations

    def get_all_locations(self):
        self.collection = self.mydb['locations']
        locations = []
        result = self.collection.find( )
        for locaion in result:
            locations.append({
            "name":  locaion["name"],
            "locationType": locaion["locationType"]
        })
        return locations
    

d=DataAccess()
# res = d.check_user("Sofa","Sofa1")
# time.sleep(3)
d.end_session('606317f07d9ddb252a05d5db')
# print(res["id"])
 