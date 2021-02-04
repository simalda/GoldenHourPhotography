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

    def addTimeUnit(self, timeUnit):
        self.mycollection = self.mydb['calendar']
        self.mycollection.insert_one({"date": timeUnit.date,"dayOfWeek":timeUnit.dayOfWeek, "time":timeUnit.time,"isWeekly":timeUnit.isWeekly})   
        # return True

    def deleteTimeUnit(self, timeUnit):
        self.mycollection = self.mydb['calendar']
        myquery = { "dateFormated":timeUnit.dateFormated,  "time":timeUnit.time}
        self.mycollection.delete_one(myquery)
 
 


    def getTimeSlots(self):
        self.imagesCollection = self.mydb['calendar']
        slots = []
        result = self.imagesCollection.find( )
        for slot in result:
            slots.append({
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]           
        })
        print(slots)
        return slots

    def getWeeklyOpenSlots(self):
        self.imagesCollection = self.mydb['calendar']
        slots = []
        result = self.imagesCollection.find( {"isWeekly":True})
        for slot in result:
            slots.append({
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]           
        })
        print(slots)
        return slots

    def getSingleOpenSlots(self):
        self.imagesCollection = self.mydb['calendar']
        slots = []
        result = self.imagesCollection.find( {"isWeekly":False})
        for slot in result:
            slots.append({
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]           
        })
        print(slots)
        return slots


    # def getAllOpenSlots(self):
    #     self.imagesCollection = self.mydb['calendar']
    #     slots = []
    #     result = self.imagesCollection.find({"orderId":None} )
    #     for slot in result:
    #         slots.append({
    #         "date": slot["date"],
    #         "dateFormated": slot["dateFormated"],
    #         "time" : slot["time"],
    #         "isWeekly" : slot["isWeekly"],
    #         "orderId": slot["orderId"]
    #     })
    #     print(slots)
    #     return slots
    
    def addOrder(self, order):
        self.mycollection = self.mydb['orders']
        self.mycollection.insert_one({"name":order.name,"telefon":order.telefon, "email":order.email, "location":order.location,"date":order.date,"time":order.time, "eventType":order.eventType,"note":order.note})

    def getOrders(self):
        self.orderCollection = self.mydb['orders']
        orders = []
        result = self.orderCollection.find( )
        for order in result:
            orders.append({
             "date":  order["date"],
            "time" : order["time"]
        })
        print(orders)
        return orders


    def updateCalendarAfterOrder(self):
        pass

# d=DataAccess()
# # im = Image("pic_04.jpg", "regular","wedding","les"   )
# # imList=[im]
# timeunit = TimeUnit(datetime.datetime.now(), "25.01.2021","10:00-11:00", True, None)
# p = d.getTimeSlots()
# print(type(p[0]["date"]))
 