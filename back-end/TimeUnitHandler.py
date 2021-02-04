class TimeUnitHandler():
    def __init__(self, dataAccess):
        self.dataAccess = dataAccess
    
    def get_time_slots(self):
        return self.dataAccess.getTimeSlots()

    def get_all_open_slots(self):
        return self.dataAccess.getAllOpenSlots()
    def get_weekly_time_slots(self):
        return self.dataAccess.getWeeklyOpenSlots()

    def get_single_time_slots(self):
        return self.dataAccess.getSingleOpenSlots()
        

    def add_time_to_calendar(self, timeUnit):
        self.dataAccess.addTimeUnit(timeUnit)

    def delete_time_from_calendar(self, timeUnit):
        self.dataAccess.deleteTimeUnit(timeUnit)

    # def edit_image(self):
    #     self.dataAccess.editImage()