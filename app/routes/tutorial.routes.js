module.exports = function(app) {
    // Define and set up additional routes here
    app.get("/tutorial", (req, res) => {
      res.json({ message: "This is a tutorial route." });
    });
  
    // Add more routes as needed
  };