const bandMembersCurrentBox = document.querySelector('.bandMembersCurrent .band-content');
const bandMembersFormerBox = document.querySelector('.bandMembersFormer .band-content');
const bandMembersRealBox = document.querySelector('.bandMembersReal .band-content');

const loadDataFromJson = () => {
    console.log(window.location.host);
    fetch(`http://${window.location.host}/members.json`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(resData => {
        prepareDOMEl(bandMembersCurrentBox, resData.virtualCurrentBandMembers);
        prepareDOMEl(bandMembersFormerBox, resData.virtualFormerBandMembers);
        prepareDOMEl(bandMembersRealBox, resData.realLifePermanentMembers);
        console.log('content loaded');
    }).catch(err => {
        console.log(err);
    })
}

const prepareDOMEl = (parentEl, data) => {
    data.forEach(el => {
        const divEl = document.createElement('div');
        divEl.classList.add('band-member');

        divEl.innerHTML = `
        <h4>${el.title}</h4>
        <img src="${el.img}" alt="${el.title} Img">
        <p>${el.occupation}</p>
        <a target="_blank" href="${el.link}">More</a>
        `;

        parentEl.appendChild(divEl);
    })
}

document.addEventListener('DOMContentLoaded', loadDataFromJson);