"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../components/layouts/main-layout.jsx";

import { iPhones } from "../../data/iphones.js";
import { accecories } from "../../data/accecories.js";

const STORAGE_KEY = "irent-rental-items";

const WHATSAPP_NUMBER = "6282329475745";

function formatPrice(price) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function findProduct(type, slug) {
  if (type === "iphone") {
    return iPhones.find((item) => slugify(item.name) === slug);
  }

  if (type === "accessory") {
    return accecories.find((item) => slugify(item.name) === slug);
  }

  return null;
}

function getPresetDurations(product) {
  if (!product) return [24];
  if (product.prices && product.prices.length > 0) {
    return product.prices.map((p) => p.duration);
  }
  if (product.price) {
    return [24];
  }
  return [6];
}

function getPriceInfo(product, duration) {
  if (!product) return { amount: 0, label: formatPrice(0) };

  if (product.prices) {
    const option = product.prices.find(
      (item) => item.duration === Number(duration),
    );
    if (option) {
      return { amount: option.price, label: formatPrice(option.price) };
    }
  }

  if (product.price && Number(duration) === 24) {
    return { amount: product.price, label: formatPrice(product.price) };
  }

  return { amount: 0, label: "Diskusikan via WhatsApp" };
}

function getDurationLabel(item) {
  return `${item.duration} jam`;
}

export default function RentalPage() {
  const [selectedType, setSelectedType] = useState("iphone");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    date: "",
    time: "",
    pickupMethod: "ambil",
    codLocation: "",
    apps: "",
    note: "",
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedItems = localStorage.getItem(STORAGE_KEY);
    let currentItems = [];

    if (savedItems) {
      try {
        currentItems = JSON.parse(savedItems);
      } catch {
        currentItems = [];
      }
    }

    const params = new URLSearchParams(window.location.search);
    const queryType = params.get("type");
    const queryUnit = params.get("unit");

    if (queryUnit) {
      const type = queryType || "iphone";
      const product = findProduct(type, queryUnit);

      if (product) {
        const exists = currentItems.some(
          (item) => item.type === type && item.slug === queryUnit,
        );

        if (!exists) {
          const presets = getPresetDurations(product);
          currentItems.push({
            type,
            slug: queryUnit,
            duration: presets[0] || 6,
          });
        }
      }
    }

    setItems(currentItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const availableProducts = selectedType === "iphone" ? iPhones : accecories;

  // LOGIC PEMERIKSAAN HARGA DISKUSIKAN VIA WA
  const displayTotal = useMemo(() => {
    if (items.length === 0) return "Diskusikan via WhatsApp";

    let sum = 0;
    for (const item of items) {
      const product = findProduct(item.type, item.slug);
      const priceInfo = getPriceInfo(product, item.duration);

      // Jika ada satu produk saja yang berstatus Diskusikan via WhatsApp, total langsung menjadi Diskusikan via WhatsApp
      if (priceInfo.label === "Diskusikan via WhatsApp") {
        return "Diskusikan via WhatsApp";
      }

      sum += priceInfo.amount;
    }

    return sum > 0 ? formatPrice(sum) : "Diskusikan via WhatsApp";
  }, [items]);

  function handleAddProduct() {
    if (!selectedProduct) return;

    const product = findProduct(selectedType, selectedProduct);

    if (!product) return;

    const exists = items.some(
      (item) => item.type === selectedType && item.slug === selectedProduct,
    );

    if (exists) {
      return;
    }

    const presets = getPresetDurations(product);

    const newItem = {
      type: selectedType,
      slug: selectedProduct,
      duration: presets[0] || 6,
    };

    setItems((current) => [...current, newItem]);
    setSelectedProduct("");
  }

  function handleRemoveItem(index) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  function handleIncrement(index) {
    setItems((current) =>
      current.map((item, i) => {
        if (i === index) {
          const product = findProduct(item.type, item.slug);
          const presets = getPresetDurations(product);
          const currentIndex = presets.indexOf(item.duration);

          if (currentIndex !== -1 && currentIndex < presets.length - 1) {
            return { ...item, duration: presets[currentIndex + 1] };
          } else {
            const lastPreset = presets[presets.length - 1] || 24;
            const nextDuration =
              item.duration >= lastPreset ? item.duration + 24 : lastPreset;
            return { ...item, duration: nextDuration };
          }
        }
        return item;
      }),
    );
  }

  function handleDecrement(index) {
    setItems((current) =>
      current.map((item, i) => {
        if (i === index) {
          const product = findProduct(item.type, item.slug);
          const presets = getPresetDurations(product);
          const currentIndex = presets.indexOf(item.duration);

          if (currentIndex > 0) {
            return { ...item, duration: presets[currentIndex - 1] };
          } else if (currentIndex === -1) {
            const lastPreset = presets[presets.length - 1] || 24;
            const nextDuration = item.duration - 24;
            return {
              ...item,
              duration: nextDuration >= lastPreset ? nextDuration : lastPreset,
            };
          }
        }
        return item;
      }),
    );
  }

  function handleFormChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (items.length === 0) {
      alert("Silakan pilih minimal satu unit.");
      return;
    }

    if (!form.name || !form.whatsapp || !form.date || !form.time) {
      alert("Silakan lengkapi data penyewaan.");
      return;
    }

    if (form.pickupMethod === "cod" && !form.codLocation) {
      alert("Silakan isi lokasi COD.");
      return;
    }

    const rentalItems = items
      .map((item) => {
        const product = findProduct(item.type, item.slug);

        if (!product) return null;

        const priceInfo = getPriceInfo(product, item.duration);

        return `- ${product.name} — ${getDurationLabel(
          item,
        )} — ${priceInfo.label}`;
      })
      .filter(Boolean)
      .join("\n");

    const pickupInfo =
      form.pickupMethod === "cod"
        ? `COD\nLokasi COD: ${form.codLocation}`
        : "Ambil di Tempat";

    const message = `Halo iRent.This, saya ingin melakukan penyewaan.
Nama:
${form.name}

No. WhatsApp:
${form.whatsapp}

Detail Penyewaan:
${rentalItems}

Tanggal Sewa:
${form.date}

Waktu Sewa:
${form.time}

Metode Pengambilan:
${pickupInfo}

Aplikasi yang ingin di-install:
${form.apps || "-"}

Catatan:
${form.note || "-"}

Total Estimasi:
${displayTotal}

Mohon konfirmasi ketersediaan unit dan detail penyewaannya.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <MainLayout>
      <section className="w-full px-4 lg:px-16 mt-24 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-16">
            <h1 className="text-[#101010] text-2xl text-center lg:text-4xl font-bold">
              Formulir Penyewaan
            </h1>

            <p className="text-[#101010]/70 text-center text-md max-w-xl">
              Pilih unit yang ingin kamu sewa, tentukan durasi, lengkapi data
              penyewaan, lalu kirim permintaan melalui WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-16">
            {/* UNIT */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[#101010] text-2xl font-bold">
                  Unit Penyewaan
                </h2>

                <p className="text-[#101010]/60 mt-2">
                  Atur durasi sewa sesuai pilihan paket waktu yang tersedia.
                </p>
              </div>

              {/* ITEM YANG SUDAH DIPILIH */}
              <div className="flex flex-col gap-4">
                {items.length === 0 ? (
                  <div className="rounded-2xl border border-[#101010]/10 p-8 text-center">
                    <p className="text-[#101010]/60">
                      Belum ada unit yang dipilih.
                    </p>
                  </div>
                ) : (
                  items.map((item, index) => {
                    const product = findProduct(item.type, item.slug);

                    if (!product) return null;

                    const priceInfo = getPriceInfo(product, item.duration);

                    return (
                      <div
                        key={`${item.type}-${item.slug}`}
                        className="rounded-2xl p-5 border border-[#101010]/10 flex flex-col lg:flex-row lg:items-center gap-6 bg-white"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative w-20 h-20 rounded-xl bg-[#101010]/5 flex items-center justify-center overflow-hidden">
                            <Image
                              src={product.url}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-contain"
                            />
                          </div>

                          <div>
                            <p className="text-[#101010] font-bold">
                              {product.name}
                            </p>

                            <p className="text-[#101010]/60 text-sm mt-1">
                              {priceInfo.label}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* TOMBOL - & + */}
                          <div className="flex items-center gap-3 bg-[#101010]/5 px-3 py-2 rounded-full">
                            <button
                              type="button"
                              onClick={() => handleDecrement(index)}
                              className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-sm hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                              -
                            </button>
                            <div className="text-center min-w-[50px]">
                              <span className="text-sm font-semibold text-black">
                                {item.duration}
                              </span>
                              <span className="text-xs text-[#101010]/60 ml-1">
                                jam
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleIncrement(index)}
                              className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-sm hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="text-sm text-white hover:bg-red-600 bg-red-500 px-4 py-2 rounded-full cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* TAMBAH UNIT */}
              <div className="rounded-2xl p-6 border border-[#101010]/10 bg-white">
                <div className="mb-5">
                  <h3 className="text-black text-lg font-semibold">
                    Tambah Unit Penyewaan
                  </h3>
                  <p className="text-black/60 text-sm mt-1">
                    Tambahkan iPhone atau aksesoris yang ingin kamu masukkan ke
                    dalam penyewaan.
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="productType" className="text-black text-sm">
                      Jenis Produk
                    </label>
                    <select
                      id="productType"
                      value={selectedType}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        setSelectedProduct("");
                      }}
                      className="border border-[#101010]/15 rounded-full px-5 py-3 bg-white text-black outline-none"
                    >
                      <option value="iphone" className="text-black">
                        iPhone
                      </option>
                      <option value="accessory" className="text-black">
                        Aksesoris
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="product" className="text-black text-sm">
                      Unit yang Disewa
                    </label>
                    <select
                      id="product"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full border border-[#101010]/15 rounded-full px-5 py-3 bg-white text-black outline-none"
                    >
                      <option value="" className="text-black">
                        Pilih{" "}
                        {selectedType === "iphone" ? "iPhone" : "aksesoris"}
                      </option>
                      {availableProducts.map((product) => (
                        <option
                          key={product.name}
                          value={slugify(product.name)}
                          className="text-black"
                        >
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="px-6 py-3 rounded-full bg-[#101010] text-white hover:bg-[#101010]/90 cursor-pointer whitespace-nowrap self-end"
                  >
                    Tambah Unit
                  </button>
                </div>
              </div>

              {/* DATA PENYEWA */}
              <div className="flex flex-col gap-6 mt-6">
                <div>
                  <h2 className="text-[#101010] text-2xl font-bold">
                    Data Penyewa
                  </h2>

                  <p className="text-[#101010]/60 mt-2">
                    Isi data berikut untuk proses konfirmasi penyewaan.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* NAMA */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-[#101010]">
                      Nama (sesuai KTP)
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Nama lengkap"
                      required
                      className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-black outline-none focus:border-[#101010]/40"
                    />
                  </div>

                  {/* WHATSAPP */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="whatsapp"
                      className="text-sm text-[#101010]"
                    >
                      No. WhatsApp
                    </label>

                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={handleFormChange}
                      placeholder="08xxxxxxxxxx"
                      required
                      className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-black outline-none focus:border-[#101010]/40"
                    />
                  </div>

                  {/* TANGGAL */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-sm text-[#101010]">
                      Tanggal Sewa
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-black outline-none focus:border-[#101010]/40"
                    />
                  </div>

                  {/* WAKTU */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="text-sm text-[#101010]">
                      Waktu Sewa (Jam Pengambilan atau Mulai)
                    </label>

                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={form.time}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-black outline-none focus:border-[#101010]/40"
                    />
                  </div>

                  {/* METODE PENGAMBILAN */}
                  <div className="flex flex-col gap-2 lg:col-span-2">
                    <label
                      htmlFor="pickupMethod"
                      className="text-sm text-[#101010]"
                    >
                      Metode Pengambilan
                    </label>

                    <select
                      id="pickupMethod"
                      name="pickupMethod"
                      value={form.pickupMethod}
                      onChange={handleFormChange}
                      className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-[#101010] bg-white outline-none focus:border-[#101010]/40"
                    >
                      <option value="ambil">Ambil di Tempat</option>
                      <option value="cod">COD</option>
                    </select>
                  </div>

                  {/* LOKASI COD */}
                  {form.pickupMethod === "cod" && (
                    <div className="flex flex-col gap-2 lg:col-span-2">
                      <label
                        htmlFor="codLocation"
                        className="text-sm text-[#101010]"
                      >
                        Lokasi COD
                      </label>

                      <textarea
                        id="codLocation"
                        name="codLocation"
                        value={form.codLocation}
                        onChange={handleFormChange}
                        placeholder="Masukkan lokasi COD secara lengkap..."
                        rows={3}
                        required
                        className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-black outline-none resize-none focus:border-[#101010]/40"
                      />
                    </div>
                  )}

                  {/* APLIKASI */}
                  <div className="flex flex-col gap-2 lg:col-span-2">
                    <label htmlFor="apps" className="text-sm text-[#101010]">
                      Aplikasi yang Ingin Di-install
                    </label>

                    <textarea
                      id="apps"
                      name="apps"
                      value={form.apps}
                      onChange={handleFormChange}
                      placeholder="Contoh: Instagram, WhatsApp, TikTok, CapCut..."
                      rows={3}
                      className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-black outline-none resize-none focus:border-[#101010]/40"
                    />

                    <p className="text-[#101010]/50 text-sm">
                      Tulis aplikasi yang ingin disiapkan sebelum mengambil
                      iPhone.
                    </p>
                  </div>

                  {/* CATATAN */}
                  <div className="flex flex-col gap-2 lg:col-span-2">
                    <label htmlFor="note" className="text-sm text-[#101010]">
                      Catatan
                    </label>

                    <textarea
                      id="note"
                      name="note"
                      value={form.note}
                      onChange={handleFormChange}
                      placeholder="Tambahkan catatan jika diperlukan..."
                      rows={4}
                      className="w-full border border-[#101010]/15 rounded-xl px-5 py-3 text-black outline-none resize-none focus:border-[#101010]/40"
                    />
                  </div>
                </div>
              </div>

              {/* TOTAL + SUBMIT */}
              <div className="border-t border-[#101010]/10 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-[#101010]/60 text-sm">Estimasi total</p>

                  <p className="text-[#101010] text-3xl font-bold mt-1">
                    {displayTotal}
                  </p>

                  <p className="text-[#101010]/50 text-sm mt-2">
                    Informasi ketersediaan akan dikonfirmasi melalui WhatsApp.
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-orange-600 hover:bg-orange-600/90 text-white cursor-pointer"
                >
                  Kirim Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}