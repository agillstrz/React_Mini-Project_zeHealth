import { useMutation } from "@apollo/client";
import { FormatRupiah } from "@arismun/format-rupiah";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { storage } from "../../config/firebase";
import { Pembayaran } from "../../graphql/Mutations";

export const FormPembayaran = () => {
  const { id } = useParams();
  let link = useLocation();
  const datas = link.state.zeHealth_obat[0];
  let navigate = useNavigate();
  const [pembayaran, { loading: loadPembayaran }] = useMutation(Pembayaran);
  const [juml, setJml] = useState(1);
  const [btn, setBtn] = useState(true);
  const [pesanan, setPesanan] = useState({
    nama: "",
    noHp: "",
    metode: "",
    bukti: null,
  });

  const [formErrors, setFormErrors] = useState({
    nama: "*Nama wajib diisi",
    noHp: "* Nomor Wajib diisi",
    metode: "Pilih Metode Pembayaran",
    bukti: "*Upload bukti pembayaran",
  });

  const regexNama = /^[a-zA-Z ]*$/;
  const regexHp = /^[0-9]{9,12}$/;

  const onChange = (e) => {
    const { name, value } = e.target;
    setPesanan({
      ...pesanan,
      [name]: value,
    });

    if (name === "noHp") {
      if (!value.match(regexHp)) {
        setFormErrors({
          ...formErrors,
          noHp: "*Nomor Hp harus angka dan berjumlah 9-12 karakter",
        });
      } else {
        setFormErrors({
          ...formErrors,
          noHp: "",
        });
      }
    }

    if (name === "nama") {
      if (!value.match(regexNama)) {
        setFormErrors({
          ...formErrors,
          nama: "*Nama harus berupa huruf",
        });
      } else {
        setFormErrors({
          ...formErrors,
          nama: "",
        });
      }
    }
    if (name === "metode") {
      if (value === "") {
        setFormErrors({
          ...formErrors,
          metode: "Pilih Metode Pembayaran",
        });
      } else {
        setFormErrors({
          ...formErrors,
          metode: "",
        });
      }
    }
  };
  const handleImage = (e) => {
    const imageUpload = e.target.files[0];
    if (!imageUpload) return;
    const storageRef = ref(storage, `buktiPembayaran/${imageUpload.name}`);
    uploadBytes(storageRef, imageUpload).then(() => {
      getDownloadURL(storageRef).then((url) => {
        setPesanan({ ...pesanan, bukti: url });
      });
    });

    if (imageUpload !== null) {
      setFormErrors({
        ...formErrors,
        bukti: "",
      });
    }
  };
  useEffect(() => {
    const { nama, noHp, metode, bukti } = formErrors;
    if (
      nama == "" &&
      noHp == "" &&
      metode == "" &&
      bukti == "" &&
      pesanan.bukti
    ) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [formErrors, pesanan.bukti]);

  const bayar = (bayar) => {
    pembayaran({
      variables: bayar,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nama, metode, noHp, bukti } = pesanan;
    const totalHarga = juml * datas.harga_obat;
    const formPemesanan = {
      Nama_Pembeli: nama,
      Metode_pembayaran: metode,
      noHp: noHp,
      obat: datas.nama_obat,
      total_harga: totalHarga,
      total_obat: juml,
      bukti: bukti,
    };
    bayar(formPemesanan);
    navigate("/transaksi");
  };

  if (loadPembayaran) {
    return <h1>halo..</h1>;
  }

  return (
    <div className="min-h-screen">
      <div className=" flex justify-center   pt-28">
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal" id="my-modal-2">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Cara Pembayaran di zeHealth</h3>
            <ol className="list-decimal px-4">
              <li>Isi semua form dengan benar</li>
              <li>
                Transfer sesuai dengan total harga obat ke nomor Rekening yang
                tertera pada metode pembayaran
              </li>
              <li>Screenshot atau foto bukti pembayaran</li>
              <li>Upload bukti pembayaran</li>
              <li>Pesan sekarang</li>
            </ol>
            <div className="modal-action">
              <label htmlFor="my-modal" className="zbtn cursor-pointer">
                Tutup
              </label>
            </div>
          </div>
        </div>
        <div className="w-[80%] shadow-lg bg-white   border-color2 text-color2 ">
          <div className="bg-color2 p-2 relative">
            <h1 className="text-center tracking-wider text-2xl font-bold  text-white">
              Form Pemesanan
              <span className="block">
                ze<span className="text-color1">Health💵</span>
              </span>
            </h1>
            <label
              htmlFor="my-modal"
              className="absolute group top-0 right-0 hover:bg-color1 border-color1 border hover:scale-125 hover:rotate-3  p-2 bg-color2  text-white transition-all duration-300 ease-in-out"
            >
              <span className="text-[13px] cursor-pointer group-hover:text-[17px] transition-all duration-300 ease-in-out">
                caraBayar
              </span>
              ❓
            </label>
          </div>

          <div className="flex">
            <form className="p-4  w-[70%]" onSubmit={handleSubmit}>
              <div className="flex">
                <div className="w-1/2">
                  <div className="p-2">
                    <label className="block pb-2" htmlFor="nama">
                      Nama Lengkap
                    </label>
                    <input
                      onChange={onChange}
                      name="nama"
                      id="nama"
                      type="text"
                      placeholder="Nama Lengkap..."
                      className="input rounded-lg  w-full input-bordered  max-w-xs"
                    />
                    <span className="errors ">{formErrors.nama}</span>
                  </div>
                  <div className="p-2">
                    <label className="block pb-2" htmlFor="nama">
                      Nomor Handphone
                    </label>
                    <input
                      id="nama"
                      type="number"
                      onChange={onChange}
                      name="noHp"
                      placeholder="Nomor Hp..."
                      className="input rounded-lg  w-full  input-bordered  max-w-xs"
                    />
                    <span className="errors">{formErrors.noHp}</span>
                  </div>
                </div>
                <div className=" w-1/2">
                  <div className="p-2">
                    <label className="block pb-2" htmlFor="nama">
                      Metode Pembayaran
                    </label>
                    <select
                      onChange={onChange}
                      name="metode"
                      value=""
                      className="select font-normal rounded-lg"
                    >
                      <option disabled selected>
                        Pilh Metode Pembayaran...
                      </option>
                      <option value="BRI">
                        BRI: 123456789 a/n Muhammad Agil
                      </option>
                      <option value="Gopay">
                        Gopay: 123456789 a/n Muhammad Agil
                      </option>
                      <option value="Mandiri">
                        Mandiri: 123456789 a/n Muhammad Agil
                      </option>
                    </select>
                    <span className="errors">{formErrors.metode}</span>
                  </div>
                  <div className="p-2">
                    <label className="block pb-2" htmlFor="nama">
                      Bukti Pembayaran
                    </label>
                    <input
                      onChange={handleImage}
                      name="bukti"
                      type="file"
                      className="file-input  w-full max-w-xs"
                    />
                    <span className="errors">{formErrors.bukti}</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <button
                  disabled={btn}
                  className={`${!btn ? "btn-pesan" : "btn"}`}
                >
                  Pesan
                </button>
              </div>
            </form>
            <div className="w-[30%] flex items-center bg-white  shadow-lg">
              <div className="w-full flex justify-center ">
                <div className="w-[90%]">
                  <img src={datas.foto_obat} alt="" />
                  <div className="justify-center items-center flex  ">
                    <div className=" w-1/2 h-full flex justify-center  ">
                      <button
                        disabled={juml > 1 ? false : true}
                        onClick={() => setJml(juml - 1)}
                        className="p-3 bg-color1 text-white rounded-lg "
                      >
                        -
                      </button>
                      <input
                        className="w-10 focus:border focus:border-color2 text-center"
                        type="text"
                        name="jumlah"
                        value={juml}
                        onChange={(e) => console.log(e.target.value)}
                      />
                      <button
                        disabled={juml >= datas.stok_obat ? true : false}
                        onClick={() => setJml(juml + 1)}
                        className="p-3 bg-color2 rounded-lg  text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className=" w-1/2 pb-2 text-center ">
                      <h1 className="font-bold">{datas.nama_obat}</h1>
                      <p>
                        <FormatRupiah value={juml * datas.harga_obat} />
                      </p>
                    </div>
                  </div>
                  <span className="block py-3 text-center text-[15px]">
                    {juml >= datas.stok_obat
                      ? "ups stok habis"
                      : `${datas.stok_obat} stok tersedia`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
