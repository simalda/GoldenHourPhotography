from pymongo import MongoClient
from pprint import pprint
from Image import *
from TimeUnit import *
import datetime
import ConfigProvider  

from passlib.hash import sha256_crypt



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
            guid = self.create_session(user)
            return True, guid
        else:
            return False

    def create_session(self, user):
        self.collection = self.mydb['session'] 
        guid = self.collection.insert_one({"name":user, "startDate": datetime.datetime.now(),"endDate":None}).inserted_id 
        # print(str(guid.get('_id')))
        return str(guid)

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
res = d.check_user("Sofa","Sofa1")
print(res)
 