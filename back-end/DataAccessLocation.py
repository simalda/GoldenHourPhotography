
from DataAccess import DataAccess

class DataAccessLocation(DataAccess):
    
    
    def get_all_locations_info(self):
        self.collection = self.mydb['locations']
        locations = []
        result = self.collection.find( )
        for location in result:
            locations.append({
            "name":  location["name"],
            "type": location["locationType"],
            "longtitude": location["longtitude"],
            "latitude" : location["latitude"]
        })
        return locations

    def get_all_images_for_location(self, location):
        self.collection = self.mydb['images']
        images = []
        result = self.collection.find({ "location" : location } )
        for image in result:
            images.append({
            "name":image["name"],
            "imageType" : image["imageType"],
            "eventType" :image["eventType"],
            "location": image["location"]
        })
        return images

    def add_location(self, location):
        self.collection = self.mydb['locations']
        self.collection.insert_one(
        { "name" : location.name,
            "locationType" : location.location_type,
            "latitude" : location.latitude,
            "longtitude" : location.longtitude,
            "description":location.description
        }
        )
        return True


    def remove_location(self):
        pass

    def add_link_to(self):
        pass

    def get_all_links(self):
        pass

    def remove_links_from(self):
        pass

    