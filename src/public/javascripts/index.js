
function handleClickFunny(story, user, interact) {
    document.getElementById('btn1').disabled = true
    document.getElementById('btn2').disabled = true
    fetch('/v1/users-stories', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            story_id: story,
            user_id: user,
            interact: interact
        })
    }).then(res => {
        if (res.status == 200) {
            location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}