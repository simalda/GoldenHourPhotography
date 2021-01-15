from pymongo import MongoClient
from pprint import pprint
from Image import *

class DataAccess:
    def __init__(self):
        self.client=MongoClient()  
        self.client = MongoClient("mongodb://localhost:27017/") 
        self.mydb = self.client["GoldenHourPhotography"]
    

    def checkUser(self, user, psw):
        self.mycollection = self.mydb['adminUser'] 
        userDataFromDB = self.mycollection.find_one({'username': user})
        if userDataFromDB == None:
            return False
        else:
            return True

    def addImage(self,image):
        self.mycollection = self.mydb['images']
        self.mycollection.insert_one(
        { "name" : image.name,
            "imageType" : image.imageType,
            "eventType" : image.eventType,
            "location" : image.location
        }
        )
        return True

    def editAllImages(self, imList):
        for im in imList:
            self.editImage(im)

    def editImage(self, im):
        self.imagesCollection = self.mydb['images']
        myquery = { "name": im.name}
        newvalues = { "$set": { "imageType" : im.imageType,
            "eventType":im.eventType,
            "location":im.location } }

        x = self.imagesCollection.update_one(myquery, newvalues)
        print(x.modified_count, "documents updated.")
    
    def deleteImage(self, image):
        self.imagesCollection = self.mydb['images']
        myquery = { "name": image.name}
        self.imagesCollection.delete_one(myquery)
 

    def getAllImages(self):
        self.imagesCollection = self.mydb['images']
        images = []
        result = self.imagesCollection.find( )
        for image in result:
            images.append({
            "name":image["name"],
            "imageType" : image["imageType"],
            "eventType" :image["eventType"],
            "location": image["location"]
        })
        print(images)
        return images


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

    def get_orders_inPeriod(self, firsDate, secondDate):
        self.imagesCollection = self.mydb['orders']
        result = self.imagesCollection.find( )
    
    def insert_order(self):
        pass
    #  db.orders.insert({"name":"string","secondName":"string", "telephon":"number","email":"string","date":"date", "time":"string"})?

# d=DataAccess()
# im = Image("pic_04.jpg", "regular","wedding","les"   )
# imList=[im]
# d.editAllImages(imList)
