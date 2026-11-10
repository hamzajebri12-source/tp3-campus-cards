import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

type Etudiant = {
  id: string;
  nom: string;
  filiere: string;
  note: number;
};

const etudiants: Etudiant[] = [
  { id: 'e1', nom: 'Hamza', filiere: 'IAIL S5', note: 14 },
  { id: 'e2', nom: 'Simo', filiere: 'IAIL S5', note: 9 },
  { id: 'e3', nom: 'Ana', filiere: 'IAIL S5', note: 16 },
  { id: 'e4', nom: 'Youssef', filiere: 'IAIL S5', note: 10 },
  { id: 'e5', nom: 'Yassin', filiere: 'IAIL S5', note: 9 },
];
type BadgeProps = { note: number };

function BadgeStatut({ note }: BadgeProps) {
  const admis = note >= 10;
  return (
    <View style={[styles.badge, admis ? styles.badgeAdmis : styles.badgeAjourne]}>
      <Text style={styles.texteBadge}>{admis ? 'Admis' : 'Ajourné'}</Text>
    </View>
  );
}
type CarteProps = { etudiant: Etudiant };

function CarteEtudiant({ etudiant }: CarteProps) {
  const { nom, filiere, note } = etudiant;
  return (
    <View style={styles.carte}>
      <View style={styles.enteteCarte}>
        <Text style={styles.nom}>{nom}</Text>
        <BadgeStatut note={note} />
      </View>
      <Text style={styles.information}>Filière : {filiere}</Text>
      <Text style={styles.information}>Note : {note}/20</Text>
    </View>
  );
}
export default function App() {
  const nombreAdmis = etudiants.filter(e => e.note >= 10).length;
  const total = etudiants.reduce((somme, e) => somme + e.note, 0);
  const moyenne = (total / etudiants.length).toFixed(1).replace('.', ',');

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.titre}>CampusCards</Text>
      <Text style={styles.sousTitre}>Espace d'étudiants - IAIL S5</Text>
      <View style={styles.resume}>
        <Text style={styles.texteResume}>Admis : {nombreAdmis} / {etudiants.length}</Text>
        <Text style={styles.texteResume}>Moyenne : {moyenne}/20</Text>
      </View>
      {etudiants.map(etudiant => (
        <CarteEtudiant key={etudiant.id} etudiant={etudiant} />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { paddingTop: 56, paddingBottom: 30, paddingHorizontal: 18,
    backgroundColor: '#F0F8FF', flexGrow: 1 },
  titre: { fontSize: 27, fontWeight: 'bold', color: '#618dd3' },
  sousTitre: { color: '#475164', marginTop: 5, marginBottom: 18 },
  resume: { padding: 16, borderRadius: 14, backgroundColor: '#DCEBFF',
    marginBottom: 18, gap: 5 },
  texteResume: { color: '#061327', fontWeight: '600', fontSize: 16 },
  carte: { padding: 16, backgroundColor: '#f5f5f5', borderRadius: 12,
    marginBottom: 12, borderWidth: 1, borderColor: '#D8E6F8' },
  enteteCarte: { flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 8 },
  nom: { fontWeight: 'bold', fontSize: 18, color: '#00235C', flexShrink: 1 },
  information: { color: '#3D4A5C', marginTop: 3 },
  badge: { paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 10, marginLeft: 8 },
  badgeAdmis: { backgroundColor: '#D6F5E7' },
  badgeAjourne: { backgroundColor: '#FFE5E5' },
  texteBadge: { fontSize: 12, color: '#00235C', fontWeight: 'bold' },
});
