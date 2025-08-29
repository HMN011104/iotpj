import { qs } from "./utils.js";

export function renderDevices(container, devices, onToggle){
  container.innerHTML = "";
  if(!devices || devices.length===0){
    container.innerHTML = `<div class="empty">Chưa có thiết bị</div>`;
    return;
  }
  devices.forEach(dev=>{
    const wrap = document.createElement("div");
    wrap.className = "device";
    const isOn = !!dev.status;
    wrap.innerHTML = `
      <div>
        <div class="kicker">${dev.name||"Thiết bị"}</div>
        <div class="small muted">ID: ${dev.deviceId||"-"}</div>
      </div>
      <div class="row">
        <span class="status-pill ${isOn?'status-on':'status-off'}">${isOn?'Đang bật':'Đang tắt'}</span>
        <button class="btn ${isOn?'':'success'}" data-action="toggle" ${isOn? '': ''}>
          ${isOn? 'Tắt' : 'Bật'}
        </button>
      </div>
    `;
    wrap.querySelector('[data-action="toggle"]').addEventListener("click", ()=>onToggle(dev, !isOn));
    container.appendChild(wrap);
  });
}

export function renderHistory(container, items){
  container.innerHTML = "";
  if(!items || items.length===0){
    container.innerHTML = `<div class="empty">Chưa có lịch sử</div>`;
    return;
  }
  items.forEach(h=>{
    const li = document.createElement("div");
    li.className = "card";
    const time = h._fmt || "";
    const st = h.status ? "bật" : "tắt";
    li.textContent = `${h.deviceName||"Thiết bị"} đã ${st} lúc ${time}`;
    container.appendChild(li);
  });
}

export function renderNotifications(container, items){
  container.innerHTML = "";
  if(!items || items.length===0){
    container.innerHTML = `<div class="empty">Chưa có thông báo</div>`;
    return;
  }
  items.forEach(n=>{
    const li = document.createElement("div");
    li.className = "card";
    const time = n._fmt || "";
    li.textContent = `Bạn vừa đăng nhập lúc ${time}.`;
    container.appendChild(li);
  });
}
