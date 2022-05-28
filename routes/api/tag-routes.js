const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        // do all attributes need to be included?
        attributes: ['product_name'],
      },
      // {
      //   model: ProductTag,
      //   attributes: ['product_id', 'tag_id'],
      // },
    ],
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single tag by ID
router.get('/:id', (req, res) => {
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ],
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this ID' });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE (post) a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTagData) => res.json(newTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE (put) a tag by ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'Tag not found for this ID' });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this ID' });
        return;
      }
      res.json(tagData.tag_name + 'was deleted');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;