class TimeUnitHandler():
    def __init__(self, data_access):
        self.data_access = data_access
    
    def get_time_slots(self):
        return self.data_access.get_time_slots()

        
    def get_weekly_time_slots(self):
        return self.data_access.get_weekly_open_slots()

    def get_single_time_slots(self):
        return self.data_access.get_single_open_slots()
        

    def add_time_to_calendar(self, time_unit):
        self.data_access.add_time_unit(time_unit)

    def delete_time_from_calendar(self, time_unit):
        self.data_access.delete_time_unit(time_unit)

 