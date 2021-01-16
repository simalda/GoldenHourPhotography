class TimeUnitHandler():
    def __init__(self, dataAccess):
        self.dataAccess = dataAccess
    
    def get_time_slots(self):
        return self.dataAccess.getTimeSlots()

    def get_all_open_slots(self):
        return self.dataAccess.getAllOpenSlots()

    def add_time_to_calendar(self, timeUnit):
        self.dataAccess.addTimeUnit(timeUnit)

    def delete_time_unit(self, timeUnit):
        self.dataAccess.deleteTimeUnit(timeUnit)

    # def edit_image(self):
    #     self.dataAccess.editImage()