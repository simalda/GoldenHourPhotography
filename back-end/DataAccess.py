from pymongo import MongoClient
from pprint import pprint
from Image import *
from TimeUnit import *
import datetime
import ConfigProvider  

class DataAccess:
    def __init__(self):
        self.client = MongoClient(ConfigProvider.DBURL) #DBURL
        self.mydb = self.client[ConfigProvider.DBNAME]#DBNAME
    

    def check_user(self, user, psw):
        self.collection = self.mydb['adminUser'] 
        user_data_from_d_b = self.collection.find_one({'username': user})
        if user_data_from_d_b['username'] == user and user_data_from_d_b['password'] == psw:
            return True
        else:
            return False



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
    

# d=DataAccess()
# # im = Image("pic_04.jpg", "regular","wedding","les"   )
# # imList=[im]
# timeunit = TimeUnit(datetime.datetime.now(), "25.01.2021","10:00-11:00", True, None)
# p = d.getTimeSlots()
# print(type(p[0]["date"]))
 