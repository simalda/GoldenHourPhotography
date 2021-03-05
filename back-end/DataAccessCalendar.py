from DataAccess import DataAccess

class DataAccessCalendar(DataAccess):
    
    def addTimeUnit(self, timeUnit):
        self.mycollection = self.mydb['calendar']
        self.mycollection.insert_one({"date": timeUnit.date,"dayOfWeek":timeUnit.dayOfWeek, "time":timeUnit.time,"isWeekly":timeUnit.isWeekly})   
        # return True

    def deleteTimeUnit(self, timeUnit):
        self.mycollection = self.mydb['calendar']
        myquery = { "dayOfWeek":timeUnit.dayOfWeek,  "time":timeUnit.time}
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
    def updateCalendarAfterOrder(self):
        pass

    