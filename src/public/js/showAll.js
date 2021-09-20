const boxCartElement = document.getElementById('box-cart-homes');

var data = {
    location: 'all',
    typeLand: 'all',
    price: 'all',
    area: 'all',
    search: '',
}

var getHomes = function(data,eleRoot){
        fetch( '/api/get/homes', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        )
        .then((response) => response.json())
        .then(homes=>{
            let listCartHtml = homes.map(home=>{
                switch (home.type){
                    case 'np': 
                        home.type = 'nhà phố';
                        break;
                    case 'cc':
                        home.type = 'chung cư';
                        break;
                    case 'kdt':
                        home.type = 'khu đô thị';
                        break;
                }
                return `<div class="col-4-cart">
                        <a href="/chi-tiet/${home.slug}" class="cart-link">
                                <div class="cart-content">
                                <img src="../${home.avatar}" alt="${home.name}" class="cart__img">
                                <div class="cart-info">
                                    <p class="cart-name">${home.name}</p>
                                    <div>
                                        <span class="cart-price">Giá: ${home.price} VNĐ</span>
                                        <span class="cart-option">${home.type}</span>
                                    </div>
                                    <span class="cart-area">Diện tích:${home.area}m2</span>
                                    <span class="cart-location">${home.location}</span>
                                    
                                </div>
                                <button class="btn btn-cart">Liên hệ ngay</button>
                            </div>
                        </a>
                    </div>`
            })
            boxCartElement.innerHTML = listCartHtml.join('');
        })
    }

// scroll header action
document.addEventListener('DOMContentLoaded', function(){
const navbarFillterContainer = document.querySelector('.navbar-filter-container');
        window.onscroll = function(){
            if(this.pageYOffset >= 70){
                navbarFillterContainer.classList.add('navbar-fillter--up');
            }else{
                navbarFillterContainer.classList.remove('navbar-fillter--up');
            }
}

// form search
const formSearch = document.getElementById('form-search');
const formSearchInput = formSearch.querySelector('.form-groupt__input');
const textSearchBox = document.getElementById('text-search-box');
var textSearchBoxClose ;
formSearch.onsubmit = function(e){
    e.preventDefault();
    let valueInput = formSearchInput.value;
    if(valueInput){
        textSearchBox.classList.remove('hidden');
        textSearchBox.innerHTML = ' <i class="fas fa-times" id="text-search-box-close"></i>' + valueInput ;
        data.search = valueInput;
        getHomes(data);
        const textSearchBoxClose = document.getElementById('text-search-box-close');
        // remove search
        textSearchBoxClose.onclick = function(){
            textSearchBox.classList.add('hidden');
            data.search = '';
            getHomes(data);
        }
    }
}





// location
var btnFiterLocations = document.querySelectorAll('#fiter-location .dropdown-selector__name');
const itemNameLocation = document.querySelector('#fiter-location .items__name');
const DropdownLocation = document.querySelector('#fiter-location .navbar-dropdown');
const listDropdownLocation = document.querySelector('#fiter-location .navbar-dropdown__list');

DropdownLocation.onclick = (e)=>{
    e.stopPropagation();
    listDropdownLocation.style.display = 'block';
}
window.onclick = ()=>{
    listDropdownLocation.style.display = 'none';
    listDropdownArea.style.display = 'none';
    listDropdownType.style.display = 'none';
    listDropdownPrice.style.display = 'none';
}
btnFiterLocations = Array.from(btnFiterLocations)
btnFiterLocations.forEach(btnFilter=>{
    btnFilter.onclick = function(e){
        e.stopPropagation();
        data.location = e.target.getAttribute('data-value');
        var locationName = '' ;
        if(data.location === 'tphcm')  locationName = 'TP Hồ Chí Minh';
        else if(data.location === 'vt')  locationName = 'Vũng Tàu';
        else if(data.location === 'nt')  locationName = 'Nha Trang';
        else if(data.location === 'all')  locationName = 'Tất cả';

        itemNameLocation.innerText = locationName;
        listDropdownLocation.style.display = 'none';
        getHomes(data)
    }
})
// land type
var btnFiterTypes = document.querySelectorAll('#land-type .dropdown-selector__name');
const itemNameType = document.querySelector('#land-type .items__name');
const DropdownType = document.querySelector('#land-type .navbar-dropdown');
const listDropdownType = document.querySelector('#land-type .navbar-dropdown__list');

DropdownType.onclick = (e)=>{
e.stopPropagation();
listDropdownType.style.display = 'block';
}

btnFiterTypes = Array.from(btnFiterTypes)

btnFiterTypes.forEach(btnFilter=>{
btnFilter.onclick = function(e){
    e.stopPropagation();
    data.typeLand = e.target.getAttribute('data-value');
    var TypeName = '' ;
    if(data.typeLand === 'np')  TypeName = 'Nhà phố';
    else if(data.typeLand === 'cc')  TypeName = 'Chung cư';
    else if(data.typeLand === 'kdt')  TypeName = 'Khu đô thị';
    else if(data.typeLand === 'all')  TypeName = 'Tất cả';

    itemNameType.innerText = TypeName;
    listDropdownType.style.display = 'none';
    getHomes(data)
}
})

// price
var btnFiterPrices = document.querySelectorAll('#price .dropdown-selector__name');
const itemNamePrice = document.querySelector('#price .items__name');
const DropdownPrice = document.querySelector('#price .navbar-dropdown');
const listDropdownPrice = document.querySelector('#price .navbar-dropdown__list');

DropdownPrice.onclick = (e)=>{
e.stopPropagation();
listDropdownPrice.style.display = 'block';
}

btnFiterPrices = Array.from(btnFiterPrices)

btnFiterPrices.forEach(btnFilter=>{
btnFilter.onclick = function(e){
    e.stopPropagation();
    data.price = e.target.getAttribute('data-value');
    var PriceName = '' ;
    if(data.price === '-1ty')  PriceName = 'Dưới 1 tỷ';
    else if(data.price === '1+3ty')  PriceName = '1 đến 3 tỷ';
    else if(data.price === '+3ty')  PriceName = 'trên 3 tỷ';
    else if(data.price === 'all')  PriceName = 'Tất cả';

    itemNamePrice.innerText = PriceName;
    listDropdownPrice.style.display = 'none';
    getHomes(data)
}
})

// area
{

}
var btnFiterAreas = document.querySelectorAll('#area .dropdown-selector__name');
const itemNameArea = document.querySelector('#area .items__name');
const DropdownArea = document.querySelector('#area .navbar-dropdown');
const listDropdownArea = document.querySelector('#area .navbar-dropdown__list');

DropdownArea.onclick = (e)=>{
e.stopPropagation();
listDropdownArea.style.display = 'block';
}

btnFiterAreas = Array.from(btnFiterAreas)

btnFiterAreas.forEach(btnFilter=>{
btnFilter.onclick = function(e){
    e.stopPropagation();
    data.area = e.target.getAttribute('data-value');
    var AreaName = '' ;
    if(data.area === '-1000')  AreaName = 'Dưới 1000m2';
    else if(data.area === '1000+2000')  AreaName = '1000 đến 2000m2';
    else if(data.area === '+2000')  AreaName = 'trên 3000m2';
    else if(data.area === 'all')  AreaName = 'Tất cả';

    itemNameArea.innerText = AreaName;
    listDropdownArea.style.display = 'none';
    getHomes(data)
}
})

    var urlPath = window.location.pathname;
    urlPath = urlPath.split('/');
    var currenlocation = urlPath[urlPath.length-1];
    switch (currenlocation){
    case 'tphcm' : 
        data.location = 'tphcm';
        itemNameLocation.innerText = 'TP Hồ Chí Minh';
        break;
    case 'vungtau' : 
        data.location = 'vt';
        itemNameLocation.innerText = 'VŨNG TÀU';
        break;
    case 'nhatrang' : 
        data.location = 'nt';
        itemNameLocation.innerText = 'NHA TRANG';
        break;
    case 'chung-cu' : 
        data.typeLand = 'cc';
        itemNameType.innerText = 'chung cư';
        break;
    case 'khu-do-thi' : 
        data.typeLand = 'kdt';
        itemNameType.innerText = 'khu đô thị';
        break;
    case 'nha-pho' : 
        data.typeLand = 'np';
        itemNameType.innerText = 'nhà phố';
        break;
    }

    getHomes(data);

})