// Search functionality
export function filterData(text, data) {
    return data.filter((item) =>
      item?.info?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
