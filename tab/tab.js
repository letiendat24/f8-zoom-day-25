const tabs = document.querySelectorAll(".tabs");
const params = new URLSearchParams(location.search);


function activateTab(tab, tabItems, tabContents, tabId, tabIndex) {
    if (tabIndex) {
        params.set(tabId, tabIndex);
    } else {
        params.delete(tabId);
    }

    const localSearch = params.size ? `?${params}` : "";
    const newUrl = `${location.pathname}${localSearch}${location.hash}`;
    history.replaceState(null, null, newUrl);

    const activateTab = tab.querySelector(".tab-item.active");
    if (activateTab) {
        activateTab.classList.remove("active");
    }
    tabItems[tabIndex].classList.add("active");

    const activateContent = tab.querySelector(".content.active");
    if (activateContent) {
        activateContent.classList.remove("active");
    }
    tabContents[tabIndex].classList.add("active");
}

function removeTabindex(tabItems) {
    tabItems.forEach(btn => (btn.tabIndex = -1));
}


////////////////
tabs.forEach(tab => {
    const tabId = tab.id;
    const tabIndex = params.get(tabId) ?? 0;

    const tabItems = tab.querySelectorAll(".tab-item");
    const tabContents = tab.querySelectorAll(".content");
    removeTabindex(tabItems);
    if (tabItems.length) {
        tabItems[tabIndex].classList.add("active");
    }

    if (tabContents.length) {
        tabContents[tabIndex].classList.add("active");
    }

    tabItems.forEach((tabItem, idx) => {
        tabItem.onclick = function () {
            activateTab(tab, tabItems, tabContents, tabId, idx);
        }
    });

    tab.addEventListener("keydown", function (e) {
    const numberKey = Number(e.key);
    if (Number.isNaN(numberKey) || numberKey === 0) return;
    tabItems.forEach(function (tabItem, idx) {
        const dataKey = Number(tabItem.dataset.key);
        if (dataKey === numberKey) {
            activateTab(tab, tabItems, tabContents, tabId, idx);        
        }
    });
});

})

