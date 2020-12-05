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
        pprint(self.client.list_database_names())
        print(userDataFromDB)
        if userDataFromDB == None:
            return False
        else:
            return True

# d=DataAccess()
# d.checkUser('Sofja',3)
