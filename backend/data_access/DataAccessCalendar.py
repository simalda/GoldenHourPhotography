from data_access.DataAccess import DataAccess

class DataAccessCalendar(DataAccess):
    
    def add_time_unit(self, time_unit):
        self.collection = self.mydb['calendar']
        self.collection.insert_one({"date": time_unit.date,"dayOfWeek":time_unit.day_of_week, "time":time_unit.time,"isWeekly":time_unit.is_weekly})   
        # return True

    def delete_time_unit(self, time_unit):
        self.collection = self.mydb['calendar']
        myquery = { "dayOfWeek":time_unit.day_of_week,  "time":time_unit.time}
        return self.collection.delete_one(myquery)
 
 


    def get_time_slots(self):
        self.collection = self.mydb['calendar']
        return list(map(lambda slot: {
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]
        }, self.collection.find()))
         
 
 
    def get_weekly_open_slots(self):
        self.collection = self.mydb['calendar']
        return list(map(lambda slot: {
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]
        }, self.collection.find({"isWeekly":True})))
         

    def get_single_open_slots(self):
        self.collection = self.mydb['calendar']
        return list(map(lambda slot: {
            "date":  slot["date"],
            "dayOfWeek": slot["dayOfWeek"],
            "time" : slot["time"],
            "isWeekly" : slot["isWeekly"]
        }, self.collection.find({"isWeekly":False})))
         

    