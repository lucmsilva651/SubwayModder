<script setup>
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { encrypt } from "../utils/crypto.js";

const INF = 2147483647;

const checks = reactive({
  "1_inf": false,
  "2_inf": false,
  "4_inf": false,
  "5_inf": false,
  "6_inf": false,
});

const currencyMap = {
  "1_inf": "1",
  "2_inf": "2",
  "4_inf": "3",
  "5_inf": "4",
  "6_inf": "5",
};

const downloadDialog = ref(null);
let pendingType = null; // 'upgrades' | 'wallet'

function buildWalletJson() {
  const base = {
    lastSaved: new Date().toISOString(),
    currencies: {
      "1":  { value: 0, expirationType: 0, contextType: 0, contextData: {} },
      "2":  { value: 0, expirationType: 0, contextType: 0, contextData: {} },
      "3":  { value: 0, expirationType: 0, contextType: 0, contextData: {} },
      "4":  { value: 0, expirationType: 0, contextType: 0, contextData: {} },
      "5":  { value: 0, expirationType: 0, contextType: 0, contextData: {} },
      "12": {           expirationType: 0, contextType: 0, contextData: {} },
    },
    lootboxQueue: { unopenedLootboxes: [] },
    currencyAllowedInRun: {},
    lootBoxesOpened: {},
    LootTableInjectedEntryOverrides: {},
    ownedOnlyBuyOnceProducts: [],
    productPurchaseTimeData: {},
  };

  for (const [checkId, checked] of Object.entries(checks)) {
    const currId = currencyMap[checkId];
    base.currencies[currId].value = checked ? INF : 0;
  }

  return base;
}

function showDownloadDialog(type) {
  pendingType = type;
  downloadDialog.value.showModal();
}

async function confirmDownload() {
  if (pendingType === "upgrades") {
    // arquivo estático já pronto
    const link = document.createElement("a");
    link.href = "/json/upgrades.json";
    link.download = "upgrades.json";
    link.click();
  } else if (pendingType === "wallet") {
    const json = JSON.stringify(buildWalletJson());
    const base64 = await encrypt(json);

    // mesmo formato do upgrades.json
    const output = JSON.stringify({ version: 3, data: base64 });

    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wallet.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  pendingType = null;
  closeDialog();
}

function closeDialog() {
  downloadDialog.value.close();
  pendingType = null;
}
</script>

<template>
  <div class="panel">
    <h2>{{ $t("message.selectHack") }}</h2>

    <nav>
      <label class="option" v-for="(key, id) in checksLabels" :key="id">
        <input type="checkbox" v-model="checks[id]" />
        <span class="box"></span>
        <span class="opt-label">{{ $t(`message.${key}`) }}</span>
      </label>

      <div class="separator"></div>

      <!-- wallet.json gerado pelos checkboxes -->
      <button class="download-btn" @click="showDownloadDialog('wallet')">
        <Icon icon="mdi:download" class="dl-icon" />
        <span>{{ $t("message.downloadWallet") }}</span>
      </button>

      <!-- upgrades.json estático -->
      <button class="download-btn" @click="showDownloadDialog('upgrades')">
        <Icon icon="mdi:download" class="dl-icon" />
        <span>{{ $t("message.multInf") }}</span>
      </button>
    </nav>
  </div>

  <dialog ref="downloadDialog" class="hack-dialog">
    <div class="dialog-inner">
      <h3>{{ $t("message.howToUse") }}</h3>
      <ol>
        <li>{{ $t("message.step1") }}</li>
        <i18n-t keypath="message.step2" tag="li">
          <template #path>
            <code>Android/data/com.kiloo.subwaysurfers</code>
          </template>
        </i18n-t>
        <li>{{ $t("message.step3") }}</li>
      </ol>
      <div class="dialog-buttons">
        <button class="btn-confirm" @click="confirmDownload">
          <Icon icon="mdi:download" />
          {{ $t("message.downloadBtn") }}
        </button>
        <button class="btn-cancel" @click="closeDialog">
          {{ $t("message.cancelBtn") }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  data: () => ({
    checksLabels: {
      "1_inf": "moneyInf",
      "2_inf": "keysInf",
      "4_inf": "hovInf",
      "5_inf": "hdsInf",
      "6_inf": "scrbInf",
    },
  }),
};
</script>

<style scoped>
h2 {
  text-align: center;
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ffee00;
  margin: 0 0 1.2rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid #1e1e1e;
}

/* ---------- Nav ---------- */
nav {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

/* ---------- Checkbox option ---------- */
.option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  padding: 0.25rem 0.3rem;
  border-radius: 4px;
  transition: background 0.15s;
}

.option:hover {
  background: #161616;
}

.option input[type="checkbox"] {
  display: none;
}

.box {
  width: 0.85em;
  height: 0.85em;
  border: 1px solid #444;
  border-radius: 3px;
  flex-shrink: 0;
  display: grid;
  place-content: center;
  transition: border-color 0.15s, background 0.15s;
}

.box::after {
  content: "";
  width: 0.5em;
  height: 0.5em;
  background: #00ff2a;
  border-radius: 1px;
  transform: scale(0);
  transition: transform 0.12s ease-in-out;
}

.option input:checked ~ .box {
  border-color: #00ff2a;
  background: #00ff2a18;
}

.option input:checked ~ .box::after {
  transform: scale(1);
}

.opt-label {
  font-size: 0.9rem;
  color: #c8c8c8;
  user-select: none;
  padding-bottom: 1px;
}

/* ---------- Separator ---------- */
.separator {
  border: none;
  border-top: 1px solid #1e1e1e;
  margin: 0.3rem 0 0.1rem;
}

/* ---------- Download button ---------- */
.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid #ffee0033;
  border-radius: 4px;
  color: #ffee00;
  font-family: inherit;
  font-size: 0.9rem;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s, border-color 0.15s;
}

.download-btn:hover {
  background: #ffee0012;
  border-color: #ffee0088;
}

.dl-icon {
  font-size: 1.1em;
  flex-shrink: 0;
}

/* ---------- Dialog ---------- */
.hack-dialog {
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 0;
  color: #d0d0d0;
  min-width: 280px;
  text-align: left;
  /* max-width: 360px; */
  box-shadow: 0 8px 32px #000a;
}

.hack-dialog::backdrop {
  background: #000000bb;
  backdrop-filter: blur(2px);
}

.dialog-inner {
  padding: 1.4rem 1.6rem;
}

.hack-dialog h3 {
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ffee00;
  margin: 0 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #1e1e1e;
}

.hack-dialog ol {
  padding-left: 1.2rem;
  margin: 0 0 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.hack-dialog li {
  font-size: 0.82rem;
  line-height: 1.5;
  color: #aaa;
}

/* ---------- Dialog buttons ---------- */
.dialog-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-confirm,
.btn-cancel {
  font-family: inherit;
  font-size: 0.8rem;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: background 0.15s, border-color 0.15s;
}

.btn-confirm {
  background: #ffee0018;
  border: 1px solid #ffee0055;
  color: #ffee00;
}

.btn-confirm:hover {
  background: #ffee0028;
  border-color: #ffee00;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #2a2a2a;
  color: #666;
}

.btn-cancel:hover {
  border-color: #444;
  color: #999;
}
</style>