//dependencies
const db = require("../models");
const async = require('async');

//trying to figure out a way to update multiple documents in 2 different collections, using data sent from the client in the form of an array of objects.
//Each object corresponds to a single document in each collection

//tried looping through the array of objects from the client and doing the update once for each object, but I've found out that this is not kosher


module.exports ={
    //method to update a value within the points colleciton
    update: async function(req, res) {
        const newData = req.body.updatedData
        try {
            const promises = newData.map(async (item) => {
                await db.Transect
                    .updateOne({transect_id : item.transect_id},
                            {
                                transect: item.transect,
                                date: item.date,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                elevation: item.elevation,
                                crew: item.crew,
                                additionalSpecies: item.additionalSpecies
                            }
                        ).catch(e=>e);
                    await db.Point
                            .updateOne({point_id: item.point_id},
                                    {
                                        point: item.point,
                                        ground_surface: item.ground_surface,
                                        soil_moisture_percentage: item.soil_moisture_percentage,
                                        shrub_density_detail: item.shrub_density_detail,
                                        canopy_score: item.canopy_score,
                                        canopy_taxa: item.canopy_taxa,
                                        hit_one: item.hit_one,
                                        hit_two: item.hit_two
                                    }
                                ).catch(e=>e);
                return true;
            });
            await Promise.all(promises);
        } catch(err) {
            console.error(err);
        }
        
    }
}