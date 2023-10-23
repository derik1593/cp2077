const weaponTechnologyArray = {
    'power': { filename: 'power-icon.png', name: 'Power'},
    'tech': { filename: 'tech-icon.png', name: 'Tech'},
    'smart': { filename: 'smart-icon.png', name: 'Smart'},
};

const weaponTypeArray = {
    'pistol': 'Pistolet',
    'revolver': 'Rewolwer',
    'smg': 'Pistolet maszynowy',
    'lmg': 'Lekki karabin maszynowy',
    'shotgun': 'Strzelba',
    'db_shotgun': 'Podwójna strzelba',
    'assault_rifle': 'Karabin szturmowy',
    'precision_rifle': 'Karabin precyzyjny',
    'sniper_rifle': 'Karabin snajperski',
}

const weaponTierArray = {
    0: { color: '#d6d0cf', name: 'GENERACJA I'},
    1: { color: '#d6d0cf', name: 'GENERACJA I+'},
    2: { color: '#1ced82', name: 'GENERACJA II'},
    3: { color: '#1ced82', name: 'GENERACJA II+'},
    4: { color: '#2570d4', name: 'GENERACJA III'},
    5: { color: '#2570d4', name: 'GENERACJA III+'},
    6: { color: '#9d2af5', name: 'GENERACJA IV'},
    7: { color: '#9d2af5', name: 'GENERACJA IV+'},
    8: { color: '#fb922e', name: 'GENERACJA V'},
    9: { color: '#fb922e', name: 'GENERACJA V+'},
    10: { color: '#fb922e', name: 'GENERACJA V++'},
}

var dataItemArray = [];

fetch('weapons.json')
    .then(response => response.json())
    .then(data => {

        data.sort((a, b) => {
            const typeOrder = ['pistol', 'revolver', 'smg', 'lmg', 'shotgun', 'db_shotgun', 'assault_rifle', 'precision_rifle', 'sniper_rifle'];

            const aTypeOrderIndex = typeOrder.indexOf(a.type);
            const bTypeOrderIndex = typeOrder.indexOf(b.type);

            if (aTypeOrderIndex === bTypeOrderIndex) {
                if (a.iconic == true && b.iconic == false) {
                    return 1;
                } else if (b.iconic == true && a.iconic == false) {
                    return -1;
                }   
            }
                
            return aTypeOrderIndex - bTypeOrderIndex;
        });

        data.forEach(dataItem => {
            dataItemArray.push(dataItem);

            const weaponCard = document.createElement('div');
            weaponCard.classList.add('weapon-card');
            
            const tierBar = document.createElement('div');
            tierBar.classList.add('weapon-card-tier-bar');
            tierBar.style.backgroundColor = weaponTierArray[0]['color'];
            weaponCard.appendChild(tierBar);
            
            const content = document.createElement('div');
            weaponCard.appendChild(content);
            
            const weaponImage = document.createElement('img');
            weaponImage.classList.add('weapon-image');
            content.appendChild(weaponImage);
            
            const contentName = document.createElement('div');
            contentName.classList.add('weapon-card-content-name');
            content.appendChild(contentName);
            
            const weaponTechnology = document.createElement('img');
            contentName.appendChild(weaponTechnology);
            
            const weaponTextWrapper = document.createElement('div');
            contentName.appendChild(weaponTextWrapper);
            
            const weaponName = document.createElement('h2');
            weaponTextWrapper.appendChild(weaponName);
            
            const weaponType = document.createElement('h3');
            weaponTextWrapper.appendChild(weaponType);
            
            document.querySelector('#weapons-container').appendChild(weaponCard);

            weaponImage.src = 'images/weapons/' + dataItem.filename;
            weaponName.textContent = dataItem.name;
            for (const technologyIndex in weaponTechnologyArray) {
                if (dataItem.technology == technologyIndex) {
                    weaponTechnology.src = 'images/technology-icons/' + weaponTechnologyArray[technologyIndex]['filename'];
                    var weaponTechnologyName = weaponTechnologyArray[technologyIndex]['name'];
                    var weaponTechnologyFileName = weaponTechnologyArray[technologyIndex]['filename'];
                }
            }
            
            for (const typeIndex in weaponTypeArray) {
                if (dataItem.type == typeIndex) {
                    weaponType.textContent = weaponTypeArray[typeIndex];
                    var weaponTypeName = weaponTypeArray[typeIndex];
                }
            }

            if (dataItem.iconic == true) {
                content.classList.add('weapon-card-content-iconic');
                contentName.classList.add('iconic-color');
                var weaponTierName = weaponTierArray[0]['name'] + ' / IKONICZNY';
                var iconicDescription = `<div class='iconic-description'>${dataItem.iconic_description['pl']}</div>`;
            } else {
                content.classList.add('weapon-card-content');
                var weaponTierName = weaponTierArray[0]['name'];
                var iconicDescription = ``;
            }

            const weaponTooltip = document.createElement('div');
            weaponTooltip.classList.add('weapon-tooltip-container');
            weaponTooltip.style.background = 'url("images/manufacturers/' + dataItem.manufacturer + '.png") rgb(12, 11, 18)'
            weaponTooltip.style.backgroundRepeat = 'no-repeat';
            weaponTooltip.style.backgroundPosition = 'center';
            weaponTooltip.style.backgroundSize = '70%';
            const weaponTooltipTemplate = `
                <h4>${dataItem.name}</h4>
                <div class='weapon-tooltip-description-container'>
                    <p class='weapon-tooltip-tier' style='color: ${weaponTierArray[0]['color']}'>${weaponTierName}</p>
                    <div class='weapon-tooltip-technology-container'>
                        <img class='weapon-tooltip-technology-icon' src='images/technology-icons/${weaponTechnologyFileName}'>
                        ${weaponTypeName} typu ${weaponTechnologyName}
                    </div>
                    <p class='weapon-tooltip-description'>"${dataItem.description['pl']}"</p>
                </div>
                <div class='weapon-tooltip-data-container'>
                    <div class='weapon-tooltip-data'>
                        <div class='weapon-tooltip-data-heading'>
                            <p>ATAKI NA SEKUNDĘ</p>
                            <p class='tooltip-attack-speed'>0</p>
                        </div>
                        <div class='weapon-tooltip-data-bar-container'>
                            <div class='weapon-tooltip-data-bar weapon-tooltip-attack-speed-bar'></div>
                        </div>
                    </div>

                    <div class='weapon-tooltip-data'>
                        <div class='weapon-tooltip-data-heading'>
                            <p>OBRAŻENIA</p>
                            <p class='tooltip-damage'>0</p>
                        </div>
                        <div class='weapon-tooltip-data-bar-container'>
                            <div class='weapon-tooltip-data-bar weapon-tooltip-damage-bar'></div>
                        </div>
                    </div>

                    <div class='weapon-tooltip-data'>
                        <div class='weapon-tooltip-data-heading'>
                            <p>SZYBKOŚĆ PRZEŁADOWANIA BRONI</p>
                            <p class='tooltip-reload-speed'>0</p>
                        </div>
                        <div class='weapon-tooltip-data-bar-container'>
                            <div class='weapon-tooltip-data-bar weapon-tooltip-reload-speed-bar'></div>
                        </div>
                    </div>

                    <div class='weapon-tooltip-data'>
                        <div class='weapon-tooltip-data-heading'>
                            <p>EFEKTYWNY ZASIĘG BRONI</p>
                            <p class='tooltip-effective-range'>0</p>
                        </div>
                        <div class='weapon-tooltip-data-bar-container'>
                            <div class='weapon-tooltip-data-bar weapon-tooltip-effective-range-bar'></div>
                        </div>
                    </div>

                    <div class='weapon-tooltip-data'>
                        <div class='weapon-tooltip-data-heading'>
                            <p>POSŁUGIWANIE SIĘ BRONIĄ</p>
                            <p class='tooltip-weapon-handling'>0</p>
                        </div>
                        <div class='weapon-tooltip-data-bar-container'>
                            <div class='weapon-tooltip-data-bar weapon-tooltip-weapon-handling-bar'></div>
                        </div>
                    </div>
                </div>
                <div class='weapon-tooltip-stats'>
                    ${dataItem.stats['pl']}
                </div>
                ${iconicDescription}
                <div class='weapon-tooltip-weight'>
                    <i class="fa-solid fa-weight-hanging"></i> ${dataItem.weight}
                </div>`;
            weaponTooltip.innerHTML += weaponTooltipTemplate;
            weaponCard.appendChild(weaponTooltip);

            // TOOLTIP DISPLAY
            content.addEventListener('click', () => {
                if (!weaponTooltip.classList.contains('display')) {
                    document.querySelectorAll('.weapon-tooltip-container').forEach((tooltip) => {
                        tooltip.classList.remove('display');
                    });
                    weaponTooltip.classList.add('display');
                    weaponTooltip.scrollIntoView();
                } else {
                    weaponTooltip.classList.remove('display');
                };
            });

        }); // data.forEach(dataItem => {

        const statisticsValues = [
            { selector: '.tooltip-attack-speed', data: 'attack_speed', barSelector: '.weapon-tooltip-attack-speed-bar', maxValue: 15 },
            { selector: '.tooltip-damage', data: 'damage', barSelector: '.weapon-tooltip-damage-bar', maxValue: 300 },
            { selector: '.tooltip-reload-speed', data: 'reload_speed', barSelector: '.weapon-tooltip-reload-speed-bar', maxValue: 5.2 },
            { selector: '.tooltip-effective-range', data: 'effective_range', barSelector: '.weapon-tooltip-effective-range-bar', maxValue: 60 },
            { selector: '.tooltip-weapon-handling', data: 'weapon_handling', barSelector: '.weapon-tooltip-weapon-handling-bar', maxValue: 8 },
        ];

        function setProgressBarValue(selector, currentValue, maxValue, selectorIndex) {
            var progressBar = document.querySelectorAll(selector);
            var progressBarValue = (currentValue / maxValue) * 100;
            progressBar[selectorIndex].style.width = selector == '.weapon-tooltip-reload-speed-bar' ? `${100 - progressBarValue}%` : `${progressBarValue}%`;
        } 

        function updateStatisticsValue(radioButtonValue) {
            statisticsValues.forEach((statstistic) => {
                document.querySelectorAll(statstistic.selector).forEach((textValue, index) => {
                    textValue.textContent = dataItemArray[index][statstistic.data][parseInt(radioButtonValue)];
                    setProgressBarValue(statstistic.barSelector, dataItemArray[index][statstistic.data][parseInt(radioButtonValue)], statstistic.maxValue, index)
                })
            })
        }

        // STATISTICS - SET TIER TO 1 (DEFAULT)
        updateStatisticsValue(0);

        // FILTER - TIER
        const tierRadioButtons = document.getElementsByName('tier');
        tierRadioButtons.forEach((tierRadioButton) => {
            tierRadioButton.addEventListener('click', () => {
                updateStatisticsValue(tierRadioButton.value);

                document.querySelectorAll('.weapon-tooltip-tier').forEach((tooltipTier, tooltipTierIndex) => {
                    if (dataItemArray[tooltipTierIndex].iconic == true) {
                        tooltipTier.textContent = weaponTierArray[tierRadioButton.value]['name'] + ' / IKONICZNY';
                    } else {
                        tooltipTier.textContent = weaponTierArray[tierRadioButton.value]['name'];
                    }
                    tooltipTier.style.color = weaponTierArray[tierRadioButton.value]['color'];
                });

                document.querySelectorAll('.weapon-card-tier-bar').forEach((tierBar) => {
                    tierBar.style.backgroundColor = weaponTierArray[tierRadioButton.value]['color'];
                })
            });
        });

        // FILTER - TECHNOLOGY

        const technologyCheckboxButtons = document.getElementsByName('technology');
        const weaponCard = document.querySelectorAll('.weapon-card');

        technologyCheckboxButtons.forEach((technologyCheckboxButton) => {
            technologyCheckboxButton.addEventListener('click', () => {
                dataItemArray.forEach((dataItem, index) => {
                    if (!technologyCheckboxButton.checked && dataItem.technology === technologyCheckboxButton.value) {
                        weaponCard[index].classList.add('hide-technology');
                    } else if (technologyCheckboxButton.checked && dataItem.technology === technologyCheckboxButton.value) {
                        weaponCard[index].classList.remove('hide-technology');
                    }
                })
            });
        });

        // FILTER - TYPE

        const typeCheckboxButtons = document.getElementsByName('type');

        typeCheckboxButtons.forEach((typeCheckboxButton) => {
            typeCheckboxButton.addEventListener('click', () => {
                dataItemArray.forEach((dataItem, index) => {
                    if (!typeCheckboxButton.checked && dataItem.type === typeCheckboxButton.value) {
                        weaponCard[index].classList.add('hide-type');
                    } else if (typeCheckboxButton.checked && dataItem.type === typeCheckboxButton.value) {
                        weaponCard[index].classList.remove('hide-type');
                    }
                })
            });
        });

        // FILTER - ICONIC
        
        const iconicCheckboxButton = document.querySelector('[name="iconic"]');

        iconicCheckboxButton.addEventListener('click', () => {
            dataItemArray.forEach((dataItem, index) => {
                if (!iconicCheckboxButton.checked && dataItem.iconic == true) {
                    weaponCard[index].classList.add('hide-iconic');
                } else if (iconicCheckboxButton.checked && dataItem.iconic == true) {
                    weaponCard[index].classList.remove('hide-iconic');
                }   
            })
        })
}) // .then(data => { 

    
function searchWeapon() {
    var searchBar = (document.querySelector('#search-bar').value).toUpperCase();
    var weaponName = document.querySelectorAll('h2');
    var weaponCard = document.querySelectorAll('.weapon-card');

    weaponName.forEach((_, index) => {
        if (!weaponName[index].textContent.toUpperCase().includes(searchBar)) {
            weaponCard[index].classList.add('hide-search-bar');
        } else {
            weaponCard[index].classList.remove('hide-search-bar');
        }
    })
}

const dropdownMenuBtns = document.querySelectorAll('.dropdown-menu-button, .dropdown-menu-close-button');
const dropdownCloseBtn = document.querySelector('.dropdown-menu-close-button');
const dropdownMenu = document.querySelector('#filter-inputs-container');

dropdownMenuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('dropdown-menu-button')) {
            dropdownMenu.style.display = 'block';
            dropdownCloseBtn.style.display = 'grid';
            document.body.style.overflow = 'hidden';
        } else if (btn.classList.contains('dropdown-menu-close-button')) {
            dropdownMenu.style.display = 'none';
            dropdownCloseBtn.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    })
});

const mq = window.matchMedia("(max-width: 940px)");

mq.addListener(() => {
    dropdownMenu.style.display = 'none';
    dropdownCloseBtn.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (!mq.matches) {
        dropdownMenu.style.display = 'block';
    }
});