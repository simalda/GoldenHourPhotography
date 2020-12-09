from pymongo import MongoClient
from pprint import pprint

class DataAccess:
    def __init__(self):
        self.client=MongoClient()  
        self.client = MongoClient("mongodb://localhost:27017/") 
        self.mydb = self.client["GoldenHourPhotography"]
    

    def checkUser(self, user, psw):
        self.mycollection = self.mydb['AdminUser'] 
        userDataFromDB = self.mycollection.find_one({'username': user})
        if userDataFromDB == None:
            return False
        else:
            return True

    def addImage(self,name,  imageType,  imageLocation,  imageViewType,  bannerApearence):
        self.mycollection = self.mydb['Images']
        self.mycollection.insert_one(
        { "name" : name,
            "imageType" : imageType,
            "imageLocation" : imageLocation,
            "imageViewType" : imageViewType,
            "bannerApearence":bannerApearence
        }
        )
        return True
# d=DataAccess()
# d.addImage('Sofja',"adscf","","",False)
