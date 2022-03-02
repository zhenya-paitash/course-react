import List from "../models/List.js"

// @desc    Get list
// @route   GET api/list
// @access  Private
const getLists = async (req, res) => {
  const { type, genre } = req.query
  let list = []

  try {
    if (type) {
      if (genre) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type, genre } },
        ])
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type } },
        ])
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }])
    }
    // const list = await List.aggregate([
    //   { $sample: { size: 10 } },
    //   (type && genre) ?? {
    //     $match: { type, genre },
    //   },
    //   type ?? {
    //     $match: { type },
    //   },
    //   genre ?? {
    //     $match: { genre },
    //   },
    // ])
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Create new list
// @route   POST api/list
// @access  Private
const createList = async (req, res) => {
  try {
    const newList = new List(req.body)
    const savedList = await newList.save()
    res.status(201).json(savedList)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Delete list
// @route   DELETE api/list/:id
// @access  Private
const deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id)
    res.status(201).json("The list has been deleted! ⚠️")
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export { getLists, createList, deleteList }
