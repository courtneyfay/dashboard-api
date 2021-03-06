const regionalMap = {
  //east asia & pacific
  TEA:
    "'ASM','AUS','BRN','CHN','FJI','FSM','GUM','HKG','IDN','JPN','KHM','KIR','KOR','LAO','MAC','MHL','MMR','MNG','MNP','MYS','NCL','NRU','NZL','PHL','PLW','PNG','PRK','PYF','SGP','SLB','THA','TLS','TON','TUV','VNM','VUT','WSM'",
  //europe & central asia
  TEC:
    "'ALB','AND','ARM','AUT','AZE','BEL','BGR','BIH','BLR','CHE','CHI','CYP','CZE','DEU','DNK','ESP','EST','FIN','FRA','FRO','GBR','GEO','GIB','GRC','GRL','HRV','HUN','IMN','IRL','ISL','ITA','KAZ','KGZ','LIE','LTU','LUX','LVA','MCO','MDA','MKD','MNE','NLD','NOR','POL','PRT','ROU','RUS','SMR','SRB','SVK','SVN','SWE','TJK','TKM','TUR','UKR','UZB','XKX'",
  //latin america & caribbean
  TLA:
    "'ABW','ARG','ATG','BHS','BLZ','BOL','BRA','BRB','CHL','COL','CRI','CUB','CUW','CYM','DMA','DOM','ECU','GRD','GTM','GUY','HND','HTI','JAM','KNA','LCA','MAF','MEX','NIC','PAN','PER','PRI','PRY','SLV','SUR','SXM','TCA','TTO','URY','VCT','VEN','VGB','VIR'",
  //middle east & north africa
  TMN:
    "'ARE','BHR','DJI','DZA','EGY','IRN','IRQ','ISR','JOR','KWT','LBN','LBY','MAR','MLT','OMN','PSE','QAT','SAU','SYR','TUN','YEM'",
  //south asia
  TSA: "'AFG','BGD','BTN','IND','LKA','MDV','NPL','PAK'",
  //sub-saharan africa
  TSS:
    "'AGO','BDI','BEN','BFA','BWA','CAF','CIV','CMR','COD','COG','COM','CPV','ERI','ETH','GAB','GHA','GIN','GMB','GNB','GNQ','KEN','LBR','LSO','MDG','MLI','MOZ','MRT','MUS','MWI','NAM','NER','NGA','RWA','SDN','SEN','SLE','SOM','SSD','STP','SWZ','SYC','TCD','TGO','TZA','UGA','ZAF','ZMB','ZWE'",
  //north america
  NAC: "'BMU','CAN','USA'"
};

const allCountries =
  "'ASM','AUS','BRN','CHN','FJI','FSM','GUM','HKG','IDN','JPN','KHM','KIR','KOR','LAO','MAC','MHL','MMR','MNG','MNP','MYS','NCL','NRU','NZL','PHL','PLW','PNG','PRK','PYF','SGP','SLB','THA','TLS','TON','TUV','VNM','VUT','WSM','ALB','AND','ARM','AUT','AZE','BEL','BGR','BIH','BLR','CHE','CHI','CYP','CZE','DEU','DNK','ESP','EST','FIN','FRA','FRO','GBR','GEO','GIB','GRC','GRL','HRV','HUN','IMN','IRL','ISL','ITA','KAZ','KGZ','LIE','LTU','LUX','LVA','MCO','MDA','MKD','MNE','NLD','NOR','POL','PRT','ROU','RUS','SMR','SRB','SVK','SVN','SWE','TJK','TKM','TUR','UKR','UZB','XKX','ABW','ARG','ATG','BHS','BLZ','BOL','BRA','BRB','CHL','COL','CRI','CUB','CUW','CYM','DMA','DOM','ECU','GRD','GTM','GUY','HND','HTI','JAM','KNA','LCA','MAF','MEX','NIC','PAN','PER','PRI','PRY','SLV','SUR','SXM','TCA','TTO','URY','VCT','VEN','VGB','VIR','ARE','BHR','DJI','DZA','EGY','IRN','IRQ','ISR','JOR','KWT','LBN','LBY','MAR','MLT','OMN','PSE','QAT','SAU','SYR','TUN','YEM','AFG','BGD','BTN','IND','LKA','MDV','NPL','PAK','AGO','BDI','BEN','BFA','BWA','CAF','CIV','CMR','COD','COG','COM','CPV','ERI','ETH','GAB','GHA','GIN','GMB','GNB','GNQ','KEN','LBR','LSO','MDG','MLI','MOZ','MRT','MUS','MWI','NAM','NER','NGA','RWA','SDN','SEN','SLE','SOM','SSD','STP','SWZ','SYC','TCD','TGO','TZA','UGA','ZAF','ZMB','ZWE','BMU','CAN','USA'";

module.exports = {
  regionalMap,
  allCountries
};
