from pymongo import MongoClient
from pprint import pprint
from Image import *
from TimeUnit import *
import datetime
import time
import ConfigProvider  

import hashlib
from bson import ObjectId






 
class DataAccess:
    def __init__(self):
        self.client = MongoClient(ConfigProvider.DBURL) #DBURL
        self.mydb = self.client[ConfigProvider.DBNAME] #DBNAME
    

    def check_user(self, user, psw):
        self.collection = self.mydb['adminUser'] 
        user_data_from_d_b = self.collection.find_one({'username': user})
        hash_to_check = hashlib.sha256()
        hash_from_d_b = hashlib.sha256()
        hash_to_check.update(str.encode(psw))
        hash_from_d_b.update(str.encode(user_data_from_d_b['password']))
        print(hash_to_check.hexdigest())
        if user_data_from_d_b['username'] == user  and hash_from_d_b.hexdigest() == hash_to_check.hexdigest():
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


