class Order():
    def __init__(self,   date, time, name=None, telefon = None, email = None,\
     location = None, event_type = None, note = None, id=None):
        self.date = date
        self.time = time
        self.name = name
        self.telefon = telefon
        self.email = email
        self.location = location            
        self.event_type = event_type
        self.note = note
        self.id = id