
from DataAccess import DataAccess
from ConfigProvider import *

class DataAccessLocation(DataAccess):
    
    
    def get_all_locations_info(self):
        self.collection = self.mydb['locations']
        locations = []
        result = self.collection.find( )
        for location in result:
            locations.append({
            "name":  location["name"],
            "type": location["locationType"],
            "longitude": location["longitude"],
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
            "location": image["location"],
            "path": PHOTOS_BASE_URL+image["name"]

                                })
        return images

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

    def add_location_type(self, location_type):
        self.collection = self.mydb['locationTypes']
        self.collection.insert_one({"name" : location_type})
        return True

    def delete_location_type(self, location_type):
        self.collection = self.mydb['locationTypes']
        myquery = { "name":location_type}
        self.collection.delete_one(myquery)
        self.collection = self.mydb['locations']
        myquery = { "locationType": location_type }
        newvalues = { "$set": {"locationType":  "" } }     
        self.collection.update_one(myquery, newvalues)


    def delete_location(self):
        pass

    def upsert_link(self, link):
        self.collection = self.mydb['imageLinker']
        count_documents = self.collection.count_documents({"origin" : link.origin, "destination": link.destination})
        if count_documents:
            myquery = {"origin" : link.origin, "destination": link.destination}
            newvalues = { "$set": {"origin" : link.origin, "destination": link.destination, "latitude": link.latitude,"longitude": link.longitude} }

            query = self.collection.update_one(myquery, newvalues)
            print(query.modified_count, "documents updated.")
        else:
            self.collection.insert_one({"origin" : link.origin, "destination": link.destination, "latitude": link.latitude,"longitude": link.longitude})
            return True
         

    def get_links_for_image(self, image):
        self.collection = self.mydb['imageLinker']
        result = self.collection.find({ "origin" : image.name } )
        links = list(map(lambda link: {
            "origin":link["origin"],
            "destination" : link["destination"],
            "destinationImagePath":PHOTOS_BASE_URL+link["destination"],
            "latitude" :link["latitude"],
            "longitude": link["longitude"]
        },result)) 
        return links

    def delete_link(self, link):
        self.collection = self.mydb['imageLinker']
        myquery = { "origin": link.origin, "destination":link.destination}
        self.collection.delete_one(myquery)
        return True

