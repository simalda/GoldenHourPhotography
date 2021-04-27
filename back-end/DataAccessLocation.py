
from DataAccess import DataAccess

class DataAccessLocation(DataAccess):
    
    
    def get_all_locations_info(self):
        self.collection = self.mydb['locationInfo']
        locations = []
        result = self.collection.find( )
        for locaion in result:
            locations.append({
            "name":  locaion["name"],
            "longtitude": locaion["longtitude"],
            "latitude" : locaion["latitude"]
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

    def add_location(self):
        pass

    def remove_location(self):
        pass

    def add_link_to(self):
        pass

    def get_all_links(self):
        pass

    def remove_links_from(self):
        pass

    