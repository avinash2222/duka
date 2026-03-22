/** Users / customers list — base columns (visibility toggle uses same defs). */
export function getUserGridBaseColumns() {
  return [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 140 },
    { field: 'roles', headerName: 'Roles', flex: 1, minWidth: 180 },
  ];
}
