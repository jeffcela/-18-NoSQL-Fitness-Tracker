var express = require("express");
var router = express.Router();
const Workout = require("../models/workout.js");

module.exports = router;

// get workouts
router.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// new workout
router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then(dbWorkout => {
            const updatedData = dbWorkout.map(workout => {
                const totalDuration = workout.exercises.reduce((acc, curr) => acc + curr.duration, 0)
                return { day: workout.day, 
                         exercises: workout.exercises, 
                         totalDuration: totalDuration }
            })
            res.json(updatedData)
        })
        .catch(err => {
            res.json(err);
        });
});

// update workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },

        { new: true, runValidators: true }
    )
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// get all workouts
router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            const updatedData = dbWorkout.map(workout => {
                const totalDuration = workout.exercises.reduce((acc, curr) => acc + curr.duration, 0)
                return { day: workout.day, 
                         _id: workout._id, 
                         exercises: workout.exercises, 
                         totalDuration: totalDuration }
            })
            res.json(updatedData)
        })
        .catch(err => {
            res.json(err);
        });
});