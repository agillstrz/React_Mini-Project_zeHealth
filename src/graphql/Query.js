import { gql } from "@apollo/client";

export const detailTransaksi = gql`
  query MyQuery($kode_pemesanan: Int!) {
    zeHealth_Pemesan_by_pk(kode_pemesanan: $kode_pemesanan) {
      kode_pemesanan
      Nama_Pembeli
      noHp
      obat
      status_pembayaran
      total_harga
      total_obat
      bukti
      tanggal_pembelian
      Metode_pembayaran
    }
  }
`;

export const searchObat = gql`
  query MyQuery($deskripsi_obat: String) {
    zeHealth_obat(where: { deskripsi_obat: { _ilike: $deskripsi_obat } }) {
      deskripsi_obat
      nama_obat
      harga_obat
      stok_obat
      aturan
      dosis
      foto_obat
      id
      obat_to_keluhan {
        keluhan
      }
    }
  }
`;

export const getObat = gql`
  query MyQuery($limit: Int) {
    zeHealth_obat(limit: $limit) {
      nama_obat
      stok_obat
      id_keluhan
      id
      harga_obat
      foto_obat
      dosis
      deskripsi_obat
      aturan
      obat_to_keluhan {
        keluhan
      }
    }
  }
`;

export const Pemesan = gql`
  query MyQuery {
    zeHealth_Pemesan {
      kode_pemesanan
      Nama_Pembeli
      tanggal_pembelian
      noHp
      status_pembayaran
      obat
      total_harga
      total_obat
      Metode_pembayaran
      bukti
    }
  }
`;

export const getKeluhan = gql`
  query Keluhan {
    zeHealth_Keluhan {
      id
      keluhan
    }
  }
`;

export const getKeluhanObat = gql`
  query KeluhanObat($id: Int) {
    zeHealth_Keluhan(where: { id: { _eq: $id } }) {
      keluhan
      keluhan_to_obat {
        nama_obat
        id
        harga_obat
        id_keluhan
        stok_obat
        foto_obat
        obat_to_keluhan {
          keluhan
        }
      }
      id
    }
  }
`;

export const getObatById = gql`
  query MyQuery($id: Int!) {
    zeHealth_obat(where: { id: { _eq: $id } }) {
      id
      nama_obat
      harga_obat
      deskripsi_obat
      foto_obat
      stok_obat
      dosis
      aturan
      obat_to_keluhan {
        keluhan
      }
    }
  }
`;
