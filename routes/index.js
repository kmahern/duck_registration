import express from 'express';
const router = express.Router();

const duck_data = {
  "ducks": [
    {
      "duck_id": 1,
      "name": "Donald",
      "colour": "Blue",
    },
    {
      "duck_id": 2,
      "name": "Hewey",
      "colour": "Yellow",
    },
    {
      "duck_id": 3,
      "name": "Dewey",
      "colour": "Red",
    },
    {
      "duck_id": 4,
      "name": "Louie",
      "colour": "Green",
    },
  ]
}

function findDuckById(ducks, duck_id) {
  for (let i = 0; i < ducks.length; i++) {
    const duck = ducks[i]
    if (duck.duck_id === duck_id) {
      return duck
    }
  }
  return null
}

function addDuck(name, colour) {
  console.log(duck_data.ducks)
  var newDuck = { duck_id: duck_data.ducks.length+1, name: name, colour: colour }
  duck_data.ducks.push(newDuck)
}

/* GET home page. */
router.get('/', (req, res) => {
  console.log('index')
  res.render('main/index');
});

router.get('/new', (req, res) => {
  console.log('new')
  console.log(req.csrfToken())
  
  res.render('main/new', {csrf_token: req.csrfToken()})
});

router.post('/save', (req, res) => {
  console.log(req.body)
  addDuck(req.body["duckName"], req.body["duckColour"])
  console.log(duck_data.ducks)
  res.redirect(`duck/${duck_data.ducks.length}`)
});

router.get('/duck/:duck_id', (request, response) => {
  console.log(`duck_id ${request.params.duck_id}`)
  const duck_id = parseInt(request.params.duck_id)
  const duck_object = findDuckById(duck_data.ducks, duck_id)

  console.log(`duck ${duck_object.name}`)

  response.render('main/duck', { duck_info: duck_object })
})

// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get('/users', async (req, res, next) => {
  try {
      // Use the Axios instance attached to the request object
      const response = await req.axiosMiddleware.get('https://jsonplaceholder.typicode.com/users');
      res.json(response.data);
  } catch (error) {
      next(error);
  }
});

export default router;
