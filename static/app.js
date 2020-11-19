let costomPost = {
    title: "hello",
    body: "from the otter side",
    userId: 1
}

let costomHeader = {
    "content-type" : "application/json; charset=UTF-8" 
}

let url = "https://enigmatic-gorge-36577.herokuapp.com/getAddress"

function processResponse(response) {
    return new Promise((resolve, reject) => {
        console.log("Processing Response")
        resolve(response.json())
    })
}

async function postComment() {
    try {
        const response = await fetch(url)
        console.log(response)
        let data = await processResponse(response)
        console.log(data)
    } catch (err) {
        console.log(err)
    }

} 

postComment()
