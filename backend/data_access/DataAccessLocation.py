
from .DataAccess import DataAccess
from ConfigProvider import *
import logging
logger = logging.getLogger(__name__)

class DataAccessLocation(DataAccess):
    
    
    def get_all_locations_info(self):
        self.collection = self.mydb['locations']
        return list(map(lambda location: {
            "name":  location["name"],
            "type": location["locationType"],
            "longitude": location["longitude"],
            "latitude" : location["latitude"]
        }, self.collection.find()))
         

    def get_all_images_for_location(self, location):
        self.collection = self.mydb['images']
        return list(map(lambda image: {
            "id":str(image["_id"]),
            "name":image["name"],
            "imageType" : image["imageType"],
            "eventType" :image["eventType"],
            "location": image["location"],
            "path": PHOTOS_BASE_URL+image["name"] }, 
            self.collection.find({ "location" : location })))
         

    def add_location(self, location):
        self.collection = self.mydb['locations']
        self.collection.insert_one(
        { "name" : location.name,
            "locationType" : location.location_type,
            "latitude" : location.latitude,
            "longitude" : location.longitude,
            "description":location.description
        }
        )
        return True


    def delete_location(self):
        pass