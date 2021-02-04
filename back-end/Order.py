class Order():
    def __init__(self,   date, time, name=None, telefon = None, email = None, location = None, eventType = None, note = None):
        
        self.name = name
        self.telefon = telefon
        self.email = email
        self.location = location
        self.date = date
        self.time = time
        self.eventType = eventType
        self.note = note