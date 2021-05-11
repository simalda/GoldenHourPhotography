# from DataAccess import *
class LocationHandler():
    def __init__(self, data_access):
        self.data_access = data_access
     
    def get_all_locations_info(self):
        locations = self.data_access.get_all_locations_info()
        for location in locations:
            images_by_location = self.data_access.get_all_images_for_location(location["name"])
            if(len(images_by_location) != 0):
                location["sphereImageList"] = list(filter(lambda image:  image["imageType"]== "sphere", images_by_location))
                location["regularImageList"] = list(filter(lambda image:   image["imageType"] == "regular", images_by_location))
           
        return locations

    def get_all_locations_types(self):
        return  self.data_access.get_all_locations_types()

    def get_all_locations(self):
        return self.data_access.get_all_locations()

    def add_location(self, location):
        self.data_access.add_location(location)

    def add_location_type(self, location_type):
        self.data_access.add_location_type(location_type)

    def delete_location_type(self, location_type):
        self.data_access.delete_location_type(location_type)

    def remove_location(self, location):
        pass

