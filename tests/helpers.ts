import { DCC, DigitalGreenCertificate } from '../utils/dcc'

export function createDCC(data: DigitalGreenCertificate): DCC {
  const dcc = new DCC(
    'HC1:6BFOXN*TS0BI$ZD4N9:9S6RCVN5+O30K3/XIV0W23NTDE$VK G2EP4J0B3KL6QM5/OVGA/MAT%ISA3/-2E%5VR5VVBJZILDBZ8D%JTQOLC8CZ8DVCK/8D:8DQVDLED0AC-BU6SS-.DUBDNU347D8MS$ESFHDO8TF724QSHA2YR3JZIM-1U96UX4795L*KDYPWGO+9A*DOPCRFE4IWM:J8QHL9/5.+M1:6G16PCNQ+MLTMU0BR3UR:J.X0A%QXBKQ+8E/C5LG/69+FEKHG4.C/.DV2MGDIE-5QHCYQCJB4IE9WT0K3M9UVZSVK78Y9J8.P++9-G9+E93ZM$96TV6KJ73T59YLQM14+OP$I/XK$M8AO96YBDAKZ%P WUQRELS4J1T7OFKCT6:I /K/*KRZ43R4+*431TVZK WVR*GNS42J0+-9*+7E3KF%CD 810H% 0NY0H$1AVL9%7L26Y1NZ1WNZBPCG*7L%5G.%M/4GNIRDBE6J7DFUPSKX.MLEF8/72SEPKD++I*5FMHD*ZBJDBFKEG2GXTL6%7K7GK7QQ1C3H0A/LGIH'
  )
  dcc.data.payload.hcert.dgc = data
  return dcc
}

/// DCCs
export function vaccinationDCC(): DCC {
  return createDCC({
    v: [
      {
        ci: 'URN:UVCI:01DE/A22123456/1CABCDEFGHIJ1EF44ABVCT#H',
        co: 'DE',
        dn: 3,
        dt: '2022-01-05',
        is: 'Robert Koch-Institut',
        ma: 'ORG-100030215',
        mp: 'EU/1/20/1528',
        sd: 3,
        tg: '840539006',
        vp: '1119349007',
      },
    ],
    dob: '1970-01-01',
    nam: {
      fn: 'Bar',
      gn: 'Foo',
      fnt: 'FOO',
      gnt: 'BAR',
    },
    ver: '1.3.0',
  })
}

export function recoveryDCC(): DCC {
  return createDCC({
    r: [
      {
        ci: 'URN:UVCI:01DE/A22123456/1CABCDEFGHIJ1EF44ABVCT#H',
        co: 'DE',
        df: '2022-05-29',
        du: '2022-06-15',
        fr: '2022-01-10',
        is: 'Robert Koch-Institut',
        tg: '840539006',
      },
    ],
    dob: '1970-01-01',
    nam: {
      fn: 'Bar',
      gn: 'Foo',
      fnt: 'FOO',
      gnt: 'BAR',
    },
    ver: '1.3.0',
  })
}

export function testDCC(): DCC {
  return createDCC({
    t: [
      {
        ci: 'URN:UVCI:01DE/A22123456/1CABCDEFGHIJ1EF44ABVCT#H',
        co: 'DE',
        is: 'Robert Koch-Institut',
        sc: '2022-02-15T10:00:00Z',
        tc: 'Testzentrum Hamburg Hbf',
        tg: '840539006',
        tr: '260415000',
        tt: 'LP217198-3',
      },
    ],
    dob: '1970-01-01',
    nam: {
      fn: 'Bar',
      gn: 'Foo',
      fnt: 'FOO',
      gnt: 'BAR',
    },
    ver: '1.3.0',
  })
}
