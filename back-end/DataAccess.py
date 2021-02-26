from pymongo import MongoClient
from pprint import pprint
from Image import *
from TimeUnit import *
import datetime



class DataAccess:
    def __init__(self):
        self.client=MongoClient()  
        self.client = MongoClient("mongodb://localhost:27017/") 
        self.mydb = self.client["GoldenHourPhotography"]
    

    def checkUser(self, user, psw):
        self.mycollection = self.mydb['adminUser'] 
        userDataFromDB = self.mycollection.find_one({'username': user})
        if userDataFromDB['username'] == user and userDataFromDB['password'] == psw:
            return True
        else:
            return False



    def getAllImageTypes(self):
        self.imageTypesCollection = self.mydb['imageTypes']
        types = []
        for x in self.imageTypesCollection.find():
            types.append(x["type"])
        return types

    def getAllEventTypes(self):
        self.eventTypesCollection = self.mydb['eventTypes']
        types = []
        for x in self.eventTypesCollection.find():
            types.append(x["type"])
        print(types)
        return types

    

    
    def getAllLocationsInfo(self):
        self.locationInfoCollection = self.mydb['locationInfo']
        locations = []
        result = self.locationInfoCollection.find( )
        for locaion in result:
            locations.append({
            "name":  locaion["name"],
            "longtitude": locaion["longtitude"],
            "latitude" : locaion["latitude"]
        })
        print(locations)
        return locations

# d=DataAccess()
# # im = Image("pic_04.jpg", "regular","wedding","les"   )
# # imList=[im]
# timeunit = TimeUnit(datetime.datetime.now(), "25.01.2021","10:00-11:00", True, None)
# p = d.getTimeSlots()
# print(type(p[0]["date"]))
 