import { gql } from "@apollo/client";

export const getObatSubs = gql`
  subscription obat($limit: Int) {
    zeHealth_obat(limit: $limit) {
      id
      nama_obat
      harga_obat
      foto_obat
      deskripsi_obat
      stok_obat
      dosis
      aturan
      obat_to_keluhan {
        keluhan
      }
    }
  }
`;
export const getObatLimit = gql`
  subscription MySubscription {
    zeHealth_obat(limit: 5) {
      nama_obat
      stok_obat
      id_keluhan
      id
      harga_obat
      deskripsi_obat
      foto_obat
      obat_to_keluhan {
        keluhan
      }
    }
  }
`;

export const pemesan = gql`
  subscription pemesan {
    zeHealth_Pemesan {
      kode_pemesanan
      Nama_Pembeli
      noHp
      obat
      total_obat
      total_harga
      status_pembayaran
      bukti
      tanggal_pembelian
      Metode_pembayaran
    }
  }
`;

export const pemesanID = gql`
  subscription MySubscription($kode_pemesanan: Int!) {
    zeHealth_Pemesan_by_pk(kode_pemesanan: $kode_pemesanan) {
      Metode_pembayaran
      Nama_Pembeli
      tanggal_pembelian
      bukti
      kode_pemesanan
      noHp
      obat
      status_pembayaran
      total_harga
    }
  }
`;
