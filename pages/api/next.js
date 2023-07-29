export default function handler(req, res) {
  //We want to read key: "Some Message", lastName
  console.log('Je suis dans le API Route')
  //   const lastName = req.body.lastName
  const { lastName, key } = req.body
  console.log(lastName)
  console.log(key)
  res.status(200).json({ name: `Your last name ${lastName} is awesome` })
}
