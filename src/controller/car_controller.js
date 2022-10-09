const Car = require("../models/car_model");
const { car_validation } = require("../utils/validations/car_validation");

// add new car

const add_car = async (req, res) => {
  try {
    let { error } = await car_validation(req.body);
    if (error) {
      return res.status(404).json({
        code: 404,
        message: error.message.replace(/\"/g, " "),
      });
    }

    let {
      model_nimber,
      chiesses_number,
      engine_number,
      registration_number,
      image,
    } = req.body;

    // let car = new Car({
    //   model_nimber: req.body.model_number,
    //   chiesses_number: req.body.chiesses_number,
    //   engine_number: req.body.engine_number,
    //   registration_number: req.body.registration_number,
    //   image: req.body.image,
    //   user: req.user._id,
    // });

    let user = req.user._id;

    let car = new Car(req.body, user);

    await car.save();

    return res.status(200).json({
      code: 200,
      message: "Car added successfully",
      data: car,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// lidt all cars

const list_all_cars = async (req, res) => {
  try {
    let all_cars = await Car.find().sort({
      createdAT: -1,
    });

    res.status(200).json({
      code: 200,
      message: "List All Cars",
      cars: all_cars,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// search car

const search_car = async (req, res) => {
  try {
    let search = req.query.search;

    let search_car = await Car.find({
      $or: [
        { model_number: { $regex: search, $options: "i" } },
        { chiesses_number: { $regex: search, $options: "i" } },
        { engine_number: { $regex: search, $options: "i" } },
        { registration_number: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json({
      code: 200,
      message: "Car Result by Search",
      cars: search_car,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// detail car by id

const detail_car_by = async (req, res) => {
  try {
    let detail_car = await Car.findById(req.params.id);
    if (!detail_car) {
      return res.status(400).json({
        code: 400,
        message: "No Car Exist or Invaild Id",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  add_car,
  list_all_cars,
  search_car,
  detail_car_by,
};
