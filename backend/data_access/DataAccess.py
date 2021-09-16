
import sys
sys.path.append(r"C:\Users\\simal\\Projects_Git\\GoldenHourPhotography\\backend")
sys.path.append(r"C:\Users\\simal\\Projects_Git\\GoldenHourPhotography\\backend\\data_access")
sys.path.append(r"C:\Users\\simal\\Projects_Git\\GoldenHourPhotography\\backend\\service")

from pymongo import MongoClient
from pprint import pprint
from Image import *
from TimeUnit import *
import datetime
import time
from ConfigProvider import * 

import hashlib
from bson import ObjectId

class DataAccess:
    def __init__(self):
        self.client = MongoClient(DBURL) #DBURL
        self.mydb = self.client[DBNAME] #DBNAME
    

    def check_user(self, user, psw):
        self.collection = self.mydb['adminUser'] 
        user_data_from_d_b = self.collection.find_one({'username': user})
        hash_to_check = hashlib.sha256()
        hash_from_d_b = hashlib.sha256()
        hash_to_check.update(str.encode(psw))
        hash_from_d_b.update(str.encode(user_data_from_d_b['password']))
        if user_data_from_d_b['username'] == user  and user_data_from_d_b['password'] == hash_to_check.hexdigest():
            guid = self.start_session(user)
            return {"result": True, "guid": guid}
        else:
            return False

    def start_session(self, user):
        self.collection = self.mydb['session'] 
        self.collection.remove()
        guid = self.collection.insert_one({"name":user, "startDate": datetime.datetime.now(),"endDate":None}).inserted_id 
        return str(guid)

    def get_all_sessions(self):
        self.collection = self.mydb['session'] 
        if self.collection.find():
            return list(map(lambda row: 
                str(row.get('_id')) ,self.collection.find()))
        else:
            return []

    def end_session(self, id):
        self.collection = self.mydb['session'] 
        myquery = { "_id": ObjectId(id)}
        newvalues = { "$set": { "endDate":datetime.datetime.now()} }

        self.collection.update_one(myquery, newvalues)

    def get_all_image_types(self):
        self.collection = self.mydb['imageTypes']
        return list(map(lambda image_type:image_type["type"],self.collection.find()))
        

    def get_all_event_types(self):
        self.collection = self.mydb['eventTypes']
        return list(map(lambda type: type["type"],self.collection.find()))
        

  

    def get_all_locations_types(self):
        self.collection = self.mydb['locationTypes']
        return list(map(lambda location: location["name"], self.collection.find()))
       

    def get_all_locations(self):
        self.collection = self.mydb['locations']
        result = self.collection.find( )
        return list(map(lambda location:  location["name"], result))
         
    def delete_location_type(self, location_type):
        try:
            self.collection = self.mydb['locationTypes']
            myquery = { "name": location_type}
            self.collection.delete_one(myquery)
            self.collection = self.mydb['locations']
            myquery = { "locationType": location_type }
            newvalues = { "$set": {"locationType":  "" } }     
            self.collection.update_one(myquery, newvalues)
            return True
        except:
            return False


    def add_location_type(self, location_type):
        self.collection = self.mydb['locationTypes']
        self.collection.insert_one({"name" : location_type})
        return True


