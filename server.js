const fs = require("fs");

const FILE = "data.json";

// LOAD DATA
let wishes = [];
if (fs.existsSync(FILE)) {
wishes = JSON.parse(fs.readFileSync(FILE));
}

// SAVE FUNCTION
function saveData() {
fs.writeFileSync(FILE, JSON.stringify(wishes, null, 2));
}

// ADD WISH
app.post("/wish", (req, res) => {
const { name, msg } = req.body;

```
if (!name || !msg) {
    return res.json({ success: false });
}

const newWish = {
    id: Date.now(),
    name,
    msg
};

wishes.push(newWish);
saveData();

res.json({ success: true });
```

});

// GET WISHES
app.get("/wishes", (req, res) => {
res.json(wishes);
});

// DELETE WISH
app.delete("/delete/:id", (req, res) => {
const id = parseInt(req.params.id);

```
wishes = wishes.filter(w => w.id !== id);
saveData();

res.json({ success: true });
```

});
