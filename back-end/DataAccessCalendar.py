from DataAccess import DataAccess

class DataAccessCalendar(DataAccess):
    
    def add_time_unit(self, time_unit):
        self.collection = self.mydb['calendar']
        self.collection.insert_one({"date": time_unit.date,"dayOfWeek":time_unit.day_of_week, "time":time_unit.time,"isWeekly":time_unit.is_weekly})   
        # return True

    def delete_time_unit(self, time_unit):
        self.collection = self.mydb['calendar']
        myquery = { "dayOfWeek":time_unit.day_of_week,  "time":time_unit.time}
        self.collection.delete_one(myquery)
 
 


    def get_time_slots(self):
        self.collection = self.mydb['calendar']
        slots = []
        result = self.collection.find( )
        for slot in result:
            slots.append({
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]           
        })
        return slots
 
 
    def get_weekly_open_slots(self):
        self.collection = self.mydb['calendar']
        slots = []
        result = self.collection.find( {"isWeekly":True})
        for slot in result:
            slots.append({
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]           
        })
        return slots

    def get_single_open_slots(self):
        self.collection = self.mydb['calendar']
        slots = []
        result = self.collection.find( {"isWeekly":False})
        for slot in result:
            slots.append({
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]           
        })
        return slots
     

    