import { gql } from "@apollo/client";

export const statusPembayaran = gql`
  mutation MyMutation($kode_pemesanan: Int!, $status_pembayaran: Boolean!) {
    update_zeHealth_Pemesan_by_pk(
      pk_columns: { kode_pemesanan: $kode_pemesanan }
      _set: { status_pembayaran: $status_pembayaran }
    ) {
      kode_pemesanan
    }
  }
`;

export const tambahObat = gql`
  mutation MyMutation(
    $id_keluhan: Int = ""
    $nama_obat: String = ""
    $harga_obat: Int = 10
    $deskripsi_obat: String = ""
    $foto_obat: String = ""
    $stok_obat: Int = 10
    $dosis: String = ""
    $aturan: String = ""
  ) {
    insert_zeHealth_obat(
      objects: {
        id_keluhan: $id_keluhan
        nama_obat: $nama_obat
        harga_obat: $harga_obat
        deskripsi_obat: $deskripsi_obat
        foto_obat: $foto_obat
        stok_obat: $stok_obat
        dosis: $dosis
        aturan: $aturan
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const updateObat = gql`
  mutation MyMutation(
    $id: Int!
    $deskripsi_obat: String = ""
    $foto_obat: String = ""
    $harga_obat: Int
    $nama_obat: String = ""
    $stok_obat: Int
    $id_keluhan: Int
    $dosis: String = ""
    $aturan: String = ""
  ) {
    update_zeHealth_obat_by_pk(
      pk_columns: { id: $id }
      _set: {
        deskripsi_obat: $deskripsi_obat
        foto_obat: $foto_obat
        harga_obat: $harga_obat
        nama_obat: $nama_obat
        stok_obat: $stok_obat
        id_keluhan: $id_keluhan
        dosis: $dosis
        aturan: $aturan
      }
    ) {
      id_keluhan
      nama_obat
      harga_obat
      deskripsi_obat
      foto_obat
      stok_obat
      dosis
      aturan
    }
  }
`;

export const Pembayaran = gql`
  mutation MyMutation(
    $Metode_pembayaran: String = ""
    $Nama_Pembeli: String = ""
    $status_pembayaran: Boolean = false
    $total_harga: Int = 0
    $total_obat: Int = 0
    $noHp: String = ""
    $bukti: String = ""
    $obat: String = ""
  ) {
    insert_zeHealth_Pemesan(
      objects: {
        Nama_Pembeli: $Nama_Pembeli
        Metode_pembayaran: $Metode_pembayaran
        total_harga: $total_harga
        total_obat: $total_obat
        noHp: $noHp
        bukti: $bukti
        obat: $obat
      }
    ) {
      returning {
        kode_pemesanan
      }
    }
  }
`;

export const hapusObat = gql`
  mutation MyMutation($id: Int) {
    delete_zeHealth_obat(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
