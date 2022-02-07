import React, { useEffect, useState } from 'react'
import { Container, Heading, Text, List, ListItem, Link } from '@chakra-ui/react'
import Header from '../components/header'
import Footer from '../components/footer'
import PageMeta from '~/components/page-meta'

type Props = {
  contactName: string
  contactAddress: string
  contactAddressCity: string
  contactAddressCountry: string
  contactEmail: string
  contactWebsite: string
}

const PrivacyEN = (props: Props) => (
  <>
    <Text mb="5">
      We are very delighted that you have shown interest in our enterprise. Data protection is of a
      particularly high priority for the management of the {props.contactName}. The use of the
      Internet pages of the {props.contactName} is possible without any indication of personal data;
      however, if a data subject wants to use special enterprise services via our website,
      processing of personal data could become necessary. If the processing of personal data is
      necessary and there is no statutory basis for such processing, we generally obtain consent
      from the data subject.
    </Text>

    <Text mb="5">
      The processing of personal data, such as the name of a data subject shall always be in line
      with the General Data Protection Regulation (GDPR), and in accordance with the
      country-specific data protection regulations applicable to the {props.contactName}. By means
      of this data protection declaration, our enterprise would like to inform the general public of
      the nature, scope, and purpose of the personal data we collect, use and process. Furthermore,
      data subjects are informed, by means of this data protection declaration, of the rights to
      which they are entitled.
    </Text>

    <Text mb="5">
      As the controller, the {props.contactName} has implemented numerous technical and
      organizational measures to ensure the most complete protection of personal data processed
      through this website. However, Internet-based data transmissions may in principle have
      security gaps, so absolute protection may not be guaranteed. For this reason, every data
      subject is free to transfer personal data to us via alternative means, e.g. by telephone.
    </Text>

    <Heading size="md" mb="2">
      1. Definitions
    </Heading>
    <Text mb="5">
      The data protection declaration of {props.contactName} is based on the terms used by the
      European legislator for the adoption of the General Data Protection Regulation (GDPR). Our
      data protection declaration should be legible and understandable for the general public, as
      well as our customers and business partners. To ensure this, we would like to first explain
      the terminology used.
    </Text>

    <Text mb="5">
      In this data protection declaration, we use, inter alia, the following terms:
    </Text>

    <List pl="5">
      <ListItem mb="5">
        <Heading size="md" mb="2">
          a) Personal data
        </Heading>
        <Text mb="5">
          Personal data means any information relating to an identified or identifiable natural
          person (“data subject”). An identifiable natural person is one who can be identified,
          directly or indirectly, in particular by reference to an identifier such as a name, an
          identification number, location data, an online identifier or to one or more factors
          specific to the physical, physiological, genetic, mental, economic, cultural or social
          identity of that natural person.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          b) Data subject
        </Heading>
        <Text mb="5">
          Data subject is any identified or identifiable natural person, whose personal data is
          processed by the controller responsible for the processing.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          c) Processing
        </Heading>
        <Text mb="5">
          Processing is any operation or set of operations which is performed on personal data or on
          sets of personal data, whether or not by automated means, such as collection, recording,
          organisation, structuring, storage, adaptation or alteration, retrieval, consultation,
          use, disclosure by transmission, dissemination or otherwise making available, alignment or
          combination, restriction, erasure or destruction.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          d) Restriction of processing
        </Heading>
        <Text mb="5">
          Restriction of processing is the marking of stored personal data with the aim of limiting
          their processing in the future.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          e) Profiling
        </Heading>
        <Text mb="5">
          Profiling means any form of automated processing of personal data consisting of the use of
          personal data to evaluate certain personal aspects relating to a natural person, in
          particular to analyse or predict aspects concerning that natural person&apos;s performance
          at work, economic situation, health, personal preferences, interests, reliability,
          behaviour, location or movements.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          f) Pseudonymisation
        </Heading>
        <Text mb="5">
          Pseudonymisation is the processing of personal data in such a manner that the personal
          data can no longer be attributed to a specific data subject without the use of additional
          information, provided that such additional information is kept separately and is subject
          to technical and organisational measures to ensure that the personal data are not
          attributed to an identified or identifiable natural person.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          g) Controller or controller responsible for the processing
        </Heading>
        <Text mb="5">
          Controller or controller responsible for the processing is the natural or legal person,
          public authority, agency or other body which, alone or jointly with others, determines the
          purposes and means of the processing of personal data; where the purposes and means of
          such processing are determined by Union or Member State law, the controller or the
          specific criteria for its nomination may be provided for by Union or Member State law.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          h) Processor
        </Heading>
        <Text mb="5">
          Processor is a natural or legal person, public authority, agency or other body which
          processes personal data on behalf of the controller.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          i) Recipient
        </Heading>
        <Text mb="5">
          Recipient is a natural or legal person, public authority, agency or another body, to which
          the personal data are disclosed, whether a third party or not. However, public authorities
          which may receive personal data in the framework of a particular inquiry in accordance
          with Union or Member State law shall not be regarded as recipients; the processing of
          those data by those public authorities shall be in compliance with the applicable data
          protection rules according to the purposes of the processing.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          j) Third party
        </Heading>
        <Text mb="5">
          Third party is a natural or legal person, public authority, agency or body other than the
          data subject, controller, processor and persons who, under the direct authority of the
          controller or processor, are authorised to process personal data.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          k) Consent
        </Heading>
        <Text mb="5">
          Consent of the data subject is any freely given, specific, informed and unambiguous
          indication of the data subject&apos;s wishes by which he or she, by a statement or by a
          clear affirmative action, signifies agreement to the processing of personal data relating
          to him or her.
        </Text>
      </ListItem>
    </List>

    <Heading size="md" mb="2">
      2. Name and Address of the controller
    </Heading>
    <Text mb="5">
      Controller for the purposes of the General Data Protection Regulation (GDPR), other data
      protection laws applicable in Member states of the European Union and other provisions related
      to data protection is:
    </Text>

    <Text mb="5">
      {props.contactName}
      <br />
      {props.contactAddress}
      <br />
      {props.contactAddressCity}
      <br />
      {props.contactAddressCountry}
      <br />
      Email: {props.contactEmail}
      <br />
      Website: {props.contactWebsite}
    </Text>

    <Heading size="md" mb="2">
      3. Collection of general data and information
    </Heading>
    <Text mb="5">
      The website of {props.contactName} collects a series of general data and information when a
      data subject or automated system calls up the website. This general data and information are
      stored in the server log files. Collected may be (1) the browser types and versions used, (2)
      the operating system used by the accessing system, (3) the website from which an accessing
      system reaches our website (so-called referrers), (4) the sub-websites, (5) the date and time
      of access to the Internet site, (6) an Internet protocol address (IP address), (7) the
      Internet service provider of the accessing system, and (8) any other similar data and
      information that may be used in the event of attacks on our information technology systems.
    </Text>

    <Text mb="5">
      When using these general data and information, {props.contactName} does not draw any
      conclusions about the data subject. Rather, this information is needed to (1) deliver the
      content of our website correctly, (2) optimize the content of our website as well as its
      advertisement, (3) ensure the long-term viability of our information technology systems and
      website technology, and (4) provide law enforcement authorities with the information necessary
      for criminal prosecution in case of a cyber-attack. Therefore, {props.contactName} analyzes
      anonymously collected data and information statistically, with the aim of increasing the data
      protection and data security of our enterprise, and to ensure an optimal level of protection
      for the personal data we process. The anonymous data of the server log files are stored
      separately from all personal data provided by a data subject.
    </Text>

    <Heading size="md" mb="2">
      4. Routine erasure and blocking of personal data
    </Heading>
    <Text mb="5">
      The data controller shall process and store the personal data of the data subject only for the
      period necessary to achieve the purpose of storage, or as far as this is granted by the
      European legislator or other legislators in laws or regulations to which the controller is
      subject to.
    </Text>

    <Text mb="5">
      If the storage purpose is not applicable, or if a storage period prescribed by the European
      legislator or another competent legislator expires, the personal data are routinely blocked or
      erased in accordance with legal requirements.
    </Text>

    <Heading size="md" mb="2">
      5. Rights of the data subject
    </Heading>
    <List pl="5">
      <ListItem mb="5">
        <Heading size="md" mb="2">
          a) Right of confirmation
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller the confirmation as to whether or not personal data concerning him or her
          are being processed. If a data subject wishes to avail himself of this right of
          confirmation, he or she may, at any time, contact any employee of the controller.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          b) Right of access
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller free information about his or her personal data stored at any time and a
          copy of this information. Furthermore, the European directives and regulations grant the
          data subject access to the following information:
        </Text>

        <List pl="5">
          <ListItem mb="5">the purposes of the processing;</ListItem>
          <ListItem mb="5">the categories of personal data concerned;</ListItem>
          <ListItem mb="5">
            the recipients or categories of recipients to whom the personal data have been or will
            be disclosed, in particular recipients in third countries or international
            organisations;
          </ListItem>
          <ListItem mb="5">
            where possible, the envisaged period for which the personal data will be stored, or, if
            not possible, the criteria used to determine that period;
          </ListItem>
          <ListItem mb="5">
            the existence of the right to request from the controller rectification or erasure of
            personal data, or restriction of processing of personal data concerning the data
            subject, or to object to such processing;
          </ListItem>
          <ListItem mb="5">
            the existence of the right to lodge a complaint with a supervisory authority;
          </ListItem>
          <ListItem mb="5">
            where the personal data are not collected from the data subject, any available
            information as to their source;
          </ListItem>
          <ListItem mb="5">
            the existence of automated decision-making, including profiling, referred to in Article
            22(1) and (4) of the GDPR and, at least in those cases, meaningful information about the
            logic involved, as well as the significance and envisaged consequences of such
            processing for the data subject.
          </ListItem>
        </List>
        <Text mb="5">
          Furthermore, the data subject shall have a right to obtain information as to whether
          personal data are transferred to a third country or to an international organisation.
          Where this is the case, the data subject shall have the right to be informed of the
          appropriate safeguards relating to the transfer.
        </Text>

        <Text mb="5">
          If a data subject wishes to avail himself of this right of access, he or she may, at any
          time, contact any employee of the controller.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          c) Right to rectification
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller without undue delay the rectification of inaccurate personal data
          concerning him or her. Taking into account the purposes of the processing, the data
          subject shall have the right to have incomplete personal data completed, including by
          means of providing a supplementary statement.
        </Text>

        <Text mb="5">
          If a data subject wishes to exercise this right to rectification, he or she may, at any
          time, contact any employee of the controller.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          d) Right to erasure (Right to be forgotten)
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller the erasure of personal data concerning him or her without undue delay, and
          the controller shall have the obligation to erase personal data without undue delay where
          one of the following grounds applies, as long as the processing is not necessary:
        </Text>

        <List pl="5">
          <ListItem mb="5">
            The personal data are no longer necessary in relation to the purposes for which they
            were collected or otherwise processed.
          </ListItem>
          <ListItem mb="5">
            The data subject withdraws consent to which the processing is based according to point
            (a) of Article 6(1) of the GDPR, or point (a) of Article 9(2) of the GDPR, and where
            there is no other legal ground for the processing.
          </ListItem>
          <ListItem mb="5">
            The data subject objects to the processing pursuant to Article 21(1) of the GDPR and
            there are no overriding legitimate grounds for the processing, or the data subject
            objects to the processing pursuant to Article 21(2) of the GDPR.
          </ListItem>
          <ListItem mb="5">The personal data have been unlawfully processed.</ListItem>
          <ListItem mb="5">
            The personal data must be erased for compliance with a legal obligation in Union or
            Member State law to which the controller is subject.
          </ListItem>
          <ListItem mb="5">
            The personal data have been collected in relation to the offer of information society
            services referred to in Article 8(1) of the GDPR.
          </ListItem>
        </List>
        <Text mb="5">
          If one of the aforementioned reasons applies, and a data subject wishes to request the
          erasure of personal data stored by {props.contactName}, he or she may, at any time,
          contact any employee of the controller. An employee of {props.contactName} shall promptly
          ensure that the erasure request is complied with immediately.
        </Text>

        <Text mb="5">
          Where the controller has made personal data public and is obliged pursuant to Article
          17(1) to erase the personal data, the controller, taking account of available technology
          and the cost of implementation, shall take reasonable steps, including technical measures,
          to inform other controllers processing the personal data that the data subject has
          requested erasure by such controllers of any links to, or copy or replication of, those
          personal data, as far as processing is not required. An employees of {props.contactName}{' '}
          will arrange the necessary measures in individual cases.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          e) Right of restriction of processing
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller restriction of processing where one of the following applies:
        </Text>

        <List pl="5">
          <ListItem mb="5">
            The accuracy of the personal data is contested by the data subject, for a period
            enabling the controller to verify the accuracy of the personal data.
          </ListItem>
          <ListItem mb="5">
            The processing is unlawful and the data subject opposes the erasure of the personal data
            and requests instead the restriction of their use instead.
          </ListItem>
          <ListItem mb="5">
            The controller no longer needs the personal data for the purposes of the processing, but
            they are required by the data subject for the establishment, exercise or defence of
            legal claims.
          </ListItem>
          <ListItem mb="5">
            The data subject has objected to processing pursuant to Article 21(1) of the GDPR
            pending the verification whether the legitimate grounds of the controller override those
            of the data subject.
          </ListItem>
        </List>
        <Text mb="5">
          If one of the aforementioned conditions is met, and a data subject wishes to request the
          restriction of the processing of personal data stored by {props.contactName}, he or she
          may at any time contact any employee of the controller. The employee of{' '}
          {props.contactName} will arrange the restriction of the processing.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          f) Right to data portability
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator, to receive the
          personal data concerning him or her, which was provided to a controller, in a structured,
          commonly used and machine-readable format. He or she shall have the right to transmit
          those data to another controller without hindrance from the controller to which the
          personal data have been provided, as long as the processing is based on consent pursuant
          to point (a) of Article 6(1) of the GDPR or point (a) of Article 9(2) of the GDPR, or on a
          contract pursuant to point (b) of Article 6(1) of the GDPR, and the processing is carried
          out by automated means, as long as the processing is not necessary for the performance of
          a task carried out in the public interest or in the exercise of official authority vested
          in the controller.
        </Text>

        <Text mb="5">
          Furthermore, in exercising his or her right to data portability pursuant to Article 20(1)
          of the GDPR, the data subject shall have the right to have personal data transmitted
          directly from one controller to another, where technically feasible and when doing so does
          not adversely affect the rights and freedoms of others.
        </Text>

        <Text mb="5">
          In order to assert the right to data portability, the data subject may at any time contact
          any employee of {props.contactName}.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          g) Right to object
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator to object, on
          grounds relating to his or her particular situation, at any time, to processing of
          personal data concerning him or her, which is based on point (e) or (f) of Article 6(1) of
          the GDPR. This also applies to profiling based on these provisions.
        </Text>

        <Text mb="5">
          {props.contactName} shall no longer process the personal data in the event of the
          objection, unless we can demonstrate compelling legitimate grounds for the processing
          which override the interests, rights and freedoms of the data subject, or for the
          establishment, exercise or defence of legal claims.
        </Text>

        <Text mb="5">
          If {props.contactName} processes personal data for direct marketing purposes, the data
          subject shall have the right to object at any time to processing of personal data
          concerning him or her for such marketing. This applies to profiling to the extent that it
          is related to such direct marketing. If the data subject objects to {props.contactName} to
          the processing for direct marketing purposes, {props.contactName} will no longer process
          the personal data for these purposes.
        </Text>

        <Text mb="5">
          In addition, the data subject has the right, on grounds relating to his or her particular
          situation, to object to processing of personal data concerning him or her by the Timo
          König for scientific or historical research purposes, or for statistical purposes pursuant
          to Article 89(1) of the GDPR, unless the processing is necessary for the performance of a
          task carried out for reasons of public interest.
        </Text>

        <Text mb="5">
          In order to exercise the right to object, the data subject may contact any employee of the
          {props.contactName}. In addition, the data subject is free in the context of the use of
          information society services, and notwithstanding Directive 2002/58/EC, to use his or her
          right to object by automated means using technical specifications.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          h) Automated individual decision-making, including profiling
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator not to be
          subject to a decision based solely on automated processing, including profiling, which
          produces legal effects concerning him or her, or similarly significantly affects him or
          her, as long as the decision (1) is not is necessary for entering into, or the performance
          of, a contract between the data subject and a data controller, or (2) is not authorised by
          Union or Member State law to which the controller is subject and which also lays down
          suitable measures to safeguard the data subject&apos;s rights and freedoms and legitimate
          interests, or (3) is not based on the data subject&apos;s explicit consent.
        </Text>

        <Text mb="5">
          If the decision (1) is necessary for entering into, or the performance of, a contract
          between the data subject and a data controller, or (2) it is based on the data
          subject&apos;s explicit consent, {props.contactName} shall implement suitable measures to
          safeguard the data subject&apos;s rights and freedoms and legitimate interests, at least
          the right to obtain human intervention on the part of the controller, to express his or
          her point of view and contest the decision.
        </Text>

        <Text mb="5">
          If the data subject wishes to exercise the rights concerning automated individual
          decision-making, he or she may, at any time, contact any employee of {props.contactName}.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          i) Right to withdraw data protection consent
        </Heading>
        <Text mb="5">
          Each data subject shall have the right granted by the European legislator to withdraw his
          or her consent to processing of his or her personal data at any time.
        </Text>

        <Text mb="5">
          If the data subject wishes to exercise the right to withdraw the consent, he or she may,
          at any time, contact any employee of {props.contactName}.
        </Text>
      </ListItem>
    </List>
    <Heading size="md" mb="2">
      6. Legal basis for the processing
    </Heading>
    <Text mb="5">
      Art. 6(1) lit. a GDPR serves as the legal basis for processing operations for which we obtain
      consent for a specific processing purpose. If the processing of personal data is necessary for
      the performance of a contract to which the data subject is party, as is the case, for example,
      when processing operations are necessary for the supply of goods or to provide any other
      service, the processing is based on Article 6(1) lit. b GDPR. The same applies to such
      processing operations which are necessary for carrying out pre-contractual measures, for
      example in the case of inquiries concerning our products or services. Is our company subject
      to a legal obligation by which processing of personal data is required, such as for the
      fulfillment of tax obligations, the processing is based on Art. 6(1) lit. c GDPR. In rare
      cases, the processing of personal data may be necessary to protect the vital interests of the
      data subject or of another natural person. This would be the case, for example, if a visitor
      were injured in our company and his name, age, health insurance data or other vital
      information would have to be passed on to a doctor, hospital or other third party. Then the
      processing would be based on Art. 6(1) lit. d GDPR. Finally, processing operations could be
      based on Article 6(1) lit. f GDPR. This legal basis is used for processing operations which
      are not covered by any of the abovementioned legal grounds, if processing is necessary for the
      purposes of the legitimate interests pursued by our company or by a third party, except where
      such interests are overridden by the interests or fundamental rights and freedoms of the data
      subject which require protection of personal data. Such processing operations are particularly
      permissible because they have been specifically mentioned by the European legislator. He
      considered that a legitimate interest could be assumed if the data subject is a client of the
      controller (Recital 47 Sentence 2 GDPR).
    </Text>

    <Heading size="md" mb="2">
      7. The legitimate interests pursued by the controller or by a third party
    </Heading>
    <Text mb="5">
      Where the processing of personal data is based on Article 6(1) lit. f GDPR our legitimate
      interest is to carry out our business in favor of the well-being of all our employees and the
      shareholders.
    </Text>

    <Heading size="md" mb="2">
      8. Period for which the personal data will be stored
    </Heading>
    <Text mb="5">
      The criteria used to determine the period of storage of personal data is the respective
      statutory retention period. After expiration of that period, the corresponding data is
      routinely deleted, as long as it is no longer necessary for the fulfillment of the contract or
      the initiation of a contract.
    </Text>

    <Heading size="md" mb="2">
      9. Provision of personal data as statutory or contractual requirement; Requirement necessary
      to enter into a contract; Obligation of the data subject to provide the personal data;
      possible consequences of failure to provide such data
    </Heading>
    <Text mb="5">
      We clarify that the provision of personal data is partly required by law (e.g. tax
      regulations) or can also result from contractual provisions (e.g. information on the
      contractual partner). Sometimes it may be necessary to conclude a contract that the data
      subject provides us with personal data, which must subsequently be processed by us. The data
      subject is, for example, obliged to provide us with personal data when our company signs a
      contract with him or her. The non-provision of the personal data would have the consequence
      that the contract with the data subject could not be concluded. Before personal data is
      provided by the data subject, the data subject must contact any employee. The employee
      clarifies to the data subject whether the provision of the personal data is required by law or
      contract or is necessary for the conclusion of the contract, whether there is an obligation to
      provide the personal data and the consequences of non-provision of the personal data.
    </Text>

    <Heading size="md" mb="2">
      10. Existence of automated decision-making
    </Heading>
    <Text mb="5">
      As a responsible company, we do not use automatic decision-making or profiling.
    </Text>

    <Text mb="5">
      Developed by the specialists for
      <Link href="https://willing-able.com/" px="1" textDecoration="underline">
        LegalTech
      </Link>
      at Willing & Able that also developed the system for
      <Link href="https://abletorecords.com/" px="1" textDecoration="underline">
        data privacy impact assessment
      </Link>
      . The legal texts contained in our privacy policy generator have been provided and published
      by
      <Link href="https://dg-datenschutz.de/" px="1" textDecoration="underline">
        Prof. Dr. h.c. Heiko Jonny Maniero
      </Link>
      from the German Association for Data Protection and
      <Link href="https://www.wbs-law.de/" rel="nofollow" px="1" textDecoration="underline">
        Christian Solmecke
      </Link>
      from WBS law.
    </Text>
  </>
)

const PrivacyDE = (props: Props) => (
  <>
    <Text mb="5">
      Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders
      hohen Stellenwert für die Geschäftsleitung der {props.contactName}. Eine Nutzung der
      Internetseiten der
      {props.contactName} ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern
      eine betroffene Person besondere Services unseres Unternehmens über unsere Internetseite in
      Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich
      werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche
      Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen
      Person ein.
    </Text>

    <Text mb="5">
      Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift,
      E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der
      Datenschutz-Grundverordnung und in Übereinstimmung mit den für die {props.contactName}{' '}
      geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerklärung
      möchte unser Unternehmen die Öffentlichkeit über Art, Umfang und Zweck der von uns erhobenen,
      genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene
      Personen mittels dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt.
    </Text>

    <Text mb="5">
      Die {props.contactName} hat als für die Verarbeitung Verantwortlicher zahlreiche technische
      und organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz der über diese
      Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch können
      Internetbasierte Datenübertragungen grundsätzlich Sicherheitslücken aufweisen, sodass ein
      absoluter Schutz nicht gewährleistet werden kann. Aus diesem Grund steht es jeder betroffenen
      Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch,
      an uns zu übermitteln.
    </Text>

    <Heading size="md" mb="2">
      1. Begriffsbestimmungen
    </Heading>
    <Text mb="5">
      Die Datenschutzerklärung der {props.contactName} beruht auf den Begrifflichkeiten, die durch
      den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung
      (DS-GVO) verwendet wurden. Unsere Datenschutzerklärung soll sowohl für die Öffentlichkeit als
      auch für unsere Kunden und Geschäftspartner einfach lesbar und verständlich sein. Um dies zu
      gewährleisten, möchten wir vorab die verwendeten Begrifflichkeiten erläutern.
    </Text>

    <Text mb="5">
      Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe:
    </Text>

    <List>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          a) personenbezogene Daten
        </Heading>
        <Text mb="5">
          Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder
          identifizierbare natürliche Person (im Folgenden „betroffene Person“) beziehen. Als
          identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt,
          insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu
          Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen,
          die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen,
          kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert werden
          kann.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          b) betroffene Person
        </Heading>
        <Text mb="5">
          Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren
          personenbezogene Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          c) Verarbeitung
        </Heading>
        <Text mb="5">
          Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang
          oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das
          Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder
          Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch
          Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die
          Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          d) Einschränkung der Verarbeitung
        </Heading>
        <Text mb="5">
          Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten
          mit dem Ziel, ihre künftige Verarbeitung einzuschränken.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          e) Profiling
        </Heading>
        <Text mb="5">
          Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin
          besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche
          Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere, um
          Aspekte bezüglich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, persönlicher
          Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser
          natürlichen Person zu analysieren oder vorherzusagen.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          f) Pseudonymisierung
        </Heading>
        <Text mb="5">
          Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche
          die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer
          spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen
          Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen
          unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer
          identifizierten oder identifizierbaren natürlichen Person zugewiesen werden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          g) Verantwortlicher oder für die Verarbeitung Verantwortlicher
        </Heading>
        <Text mb="5">
          Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche oder
          juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit
          anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
          entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das
          Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise können
          die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der
          Mitgliedstaaten vorgesehen werden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          h) Auftragsverarbeiter
        </Heading>
        <Text mb="5">
          Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder
          andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          i) Empfänger
        </Heading>
        <Text mb="5">
          Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere
          Stelle, der personenbezogene Daten offengelegt werden, unabhängig davon, ob es sich bei
          ihr um einen Dritten handelt oder nicht. Behörden, die im Rahmen eines bestimmten
          Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten
          möglicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empfänger.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          j) Dritter
        </Heading>
        <Text mb="5">
          Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere
          Stelle außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den
          Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des
          Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          k) Einwilligung
        </Heading>
        <Text mb="5">
          Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in
          informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer
          Erklärung oder einer sonstigen eindeutigen bestätigenden Handlung, mit der die betroffene
          Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden
          personenbezogenen Daten einverstanden ist.
        </Text>
      </ListItem>
    </List>

    <Heading size="md" mb="2">
      2. Name und Anschrift des für die Verarbeitung Verantwortlichen
    </Heading>
    <Text mb="5">
      Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten
      der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit
      datenschutzrechtlichem Charakter ist die:
    </Text>

    <Text mb="5">
      {props.contactName}
      <br />
      {props.contactAddress}
      <br />
      {props.contactAddressCity}
      <br />
      {props.contactAddressCountry}
      <br />
      E-Mail: {props.contactEmail}
      <br />
      Webseite: {props.contactWebsite}
    </Text>

    <Heading size="md" mb="2">
      3. Erfassung von allgemeinen Daten und Informationen
    </Heading>
    <Text mb="5">
      Die Internetseite der {props.contactName} erfasst mit jedem Aufruf der Internetseite durch
      eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und
      Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers
      gespeichert. Erfasst werden können die (1) verwendeten Browsertypen und Versionen, (2) das vom
      zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein
      zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die
      Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert
      werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine
      Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden
      Systems und (8) sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von
      Angriffen auf unsere informationstechnologischen Systeme dienen.
    </Text>

    <Text mb="5">
      Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die {props.contactName} keine
      Rückschlüsse auf die betroffene Person. Diese Informationen werden vielmehr benötigt, um (1)
      die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite
      sowie die Werbung für diese zu optimieren, (3) die dauerhafte Funktionsfähigkeit unserer
      informationstechnologischen Systeme und der Technik unserer Internetseite zu gewährleisten
      sowie (4) um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung
      notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen
      werden durch die {props.contactName} daher einerseits statistisch und ferner mit dem Ziel
      ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erhöhen, um
      letztlich ein optimales Schutzniveau für die von uns verarbeiteten personenbezogenen Daten
      sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine
      betroffene Person angegebenen personenbezogenen Daten gespeichert.
    </Text>

    <Heading size="md" mb="2">
      4. Routinemäßige Löschung und Sperrung von personenbezogenen Daten
    </Heading>
    <Text mb="5">
      Der für die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der
      betroffenen Person nur für den Zeitraum, der zur Erreichung des Speicherungszwecks
      erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber
      oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der für die Verarbeitung
      Verantwortliche unterliegt, vorgesehen wurde.
    </Text>

    <Text mb="5">
      Entfällt der Speicherungszweck oder läuft eine vom Europäischen Richtlinien- und
      Verordnungsgeber oder einem anderen zuständigen Gesetzgeber vorgeschriebene Speicherfrist ab,
      werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften
      gesperrt oder gelöscht.
    </Text>

    <Heading size="md" mb="2">
      5. Rechte der betroffenen Person
    </Heading>
    <List pl="5">
      <ListItem mb="5">
        <Heading size="md" mb="2">
          a) Recht auf Bestätigung
        </Heading>
        <Text mb="5">
          Jede betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber
          eingeräumte Recht, von dem für die Verarbeitung Verantwortlichen eine Bestätigung darüber
          zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. Möchte eine
          betroffene Person dieses Bestätigungsrecht in Anspruch nehmen, kann sie sich hierzu
          jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          b) Recht auf Auskunft
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, jederzeit von dem für die
          Verarbeitung Verantwortlichen unentgeltliche Auskunft über die zu seiner Person
          gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner
          hat der Europäische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft über
          folgende Informationen zugestanden:
        </Text>

        <List pl="5">
          <ListItem mb="5">die Verarbeitungszwecke</ListItem>
          <ListItem mb="5">die Kategorien personenbezogener Daten, die verarbeitet werden</ListItem>
          <ListItem mb="5">
            die Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen
            Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empfängern
            in Drittländern oder bei internationalen Organisationen
          </ListItem>
          <ListItem mb="5">
            falls möglich die geplante Dauer, für die die personenbezogenen Daten gespeichert
            werden, oder, falls dies nicht möglich ist, die Kriterien für die Festlegung dieser
            Dauer
          </ListItem>
          <ListItem mb="5">
            das Bestehen eines Rechts auf Berichtigung oder Löschung der sie betreffenden
            personenbezogenen Daten oder auf Einschränkung der Verarbeitung durch den
            Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung
          </ListItem>
          <ListItem mb="5">das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde</ListItem>
          <ListItem mb="5">
            wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle
            verfügbaren Informationen über die Herkunft der Daten
          </ListItem>
          <ListItem mb="5">
            das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß
            Artikel 22 Abs.1 und 4 DS-GVO und — zumindest in diesen Fällen — aussagekräftige
            Informationen über die involvierte Logik sowie die Tragweite und die angestrebten
            Auswirkungen einer derartigen Verarbeitung für die betroffene Person
          </ListItem>
        </List>
        <Text mb="5">
          Ferner steht der betroffenen Person ein Auskunftsrecht darüber zu, ob personenbezogene
          Daten an ein Drittland oder an eine internationale Organisation übermittelt wurden. Sofern
          dies der Fall ist, so steht der betroffenen Person im Übrigen das Recht zu, Auskunft über
          die geeigneten Garantien im Zusammenhang mit der Übermittlung zu erhalten.
        </Text>

        <Text mb="5">
          Möchte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie sich
          hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          c) Recht auf Berichtigung
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die unverzügliche
          Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner
          steht der betroffenen Person das Recht zu, unter Berücksichtigung der Zwecke der
          Verarbeitung, die Vervollständigung unvollständiger personenbezogener Daten — auch mittels
          einer ergänzenden Erklärung — zu verlangen.
        </Text>

        <Text mb="5">
          Möchte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie sich
          hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          d) Recht auf Löschung (Recht auf Vergessen werden)
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen zu
          verlangen, dass die sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden,
          sofern einer der folgenden Gründe zutrifft und soweit die Verarbeitung nicht erforderlich
          ist:
        </Text>

        <List pl="5">
          <ListItem mb="5">
            Die personenbezogenen Daten wurden für solche Zwecke erhoben oder auf sonstige Weise
            verarbeitet, für welche sie nicht mehr notwendig sind.
          </ListItem>
          <ListItem mb="5">
            Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gemäß
            Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO stützte, und es
            fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.
          </ListItem>
          <ListItem mb="5">
            Die betroffene Person legt gemäß Art. 21 Abs. 1 DS-GVO Widerspruch gegen die
            Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gründe für die
            Verarbeitung vor, oder die betroffene Person legt gemäß Art. 21 Abs. 2 DS-GVO
            Widerspruch gegen die Verarbeitung ein.
          </ListItem>
          <ListItem mb="5">Die personenbezogenen Daten wurden unrechtmäßig verarbeitet.</ListItem>
          <ListItem mb="5">
            Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen
            Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem
            der Verantwortliche unterliegt.
          </ListItem>
          <ListItem mb="5">
            Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der
            Informationsgesellschaft gemäß Art. 8 Abs. 1 DS-GVO erhoben.
          </ListItem>
        </List>
        <Text mb="5">
          Sofern einer der oben genannten Gründe zutrifft und eine betroffene Person die Löschung
          von personenbezogenen Daten, die bei der {props.contactName} gespeichert sind, veranlassen
          möchte, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung
          Verantwortlichen wenden. Der Mitarbeiter der {props.contactName} wird veranlassen, dass
          dem Löschverlangen unverzüglich nachgekommen wird.
        </Text>

        <Text mb="5">
          Wurden die personenbezogenen Daten von der {props.contactName} öffentlich gemacht und ist
          unser Unternehmen als Verantwortlicher gemäß Art. 17 Abs. 1 DS-GVO zur Löschung der
          personenbezogenen Daten verpflichtet, so trifft die {props.contactName} unter
          Berücksichtigung der verfügbaren Technologie und der Implementierungskosten angemessene
          Maßnahmen, auch technischer Art, um andere für die Datenverarbeitung Verantwortliche,
          welche die veröffentlichten personenbezogenen Daten verarbeiten, darüber in Kenntnis zu
          setzen, dass die betroffene Person von diesen anderen für die Datenverarbeitung
          Verantwortlichen die Löschung sämtlicher Links zu diesen personenbezogenen Daten oder von
          Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit die
          Verarbeitung nicht erforderlich ist. Der Mitarbeiter der {props.contactName} wird im
          Einzelfall das Notwendige veranlassen.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          e) Recht auf Einschränkung der Verarbeitung
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen
          die Einschränkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen
          gegeben ist:
        </Text>

        <List pl="5">
          <ListItem mb="5">
            Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten,
            und zwar für eine Dauer, die es dem Verantwortlichen ermöglicht, die Richtigkeit der
            personenbezogenen Daten zu überprüfen.
          </ListItem>
          <ListItem mb="5">
            Die Verarbeitung ist unrechtmäßig, die betroffene Person lehnt die Löschung der
            personenbezogenen Daten ab und verlangt stattdessen die Einschränkung der Nutzung der
            personenbezogenen Daten.
          </ListItem>
          <ListItem mb="5">
            Der Verantwortliche benötigt die personenbezogenen Daten für die Zwecke der Verarbeitung
            nicht länger, die betroffene Person benötigt sie jedoch zur Geltendmachung, Ausübung
            oder Verteidigung von Rechtsansprüchen.
          </ListItem>
          <ListItem mb="5">
            Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DS-GVO
            eingelegt und es steht noch nicht fest, ob die berechtigten Gründe des Verantwortlichen
            gegenüber denen der betroffenen Person überwiegen.
          </ListItem>
        </List>
        <Text mb="5">
          Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die
          Einschränkung von personenbezogenen Daten, die bei der {props.contactName} gespeichert
          sind, verlangen möchte, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die
          Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der {props.contactName} wird die
          Einschränkung der Verarbeitung veranlassen.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          f) Recht auf Datenübertragbarkeit
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die sie betreffenden
          personenbezogenen Daten, welche durch die betroffene Person einem Verantwortlichen
          bereitgestellt wurden, in einem strukturierten, gängigen und maschinenlesbaren Format zu
          erhalten. Sie hat außerdem das Recht, diese Daten einem anderen Verantwortlichen ohne
          Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt
          wurden, zu übermitteln, sofern die Verarbeitung auf der Einwilligung gemäß Art. 6 Abs. 1
          Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gemäß Art.
          6 Abs. 1 Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe automatisierter Verfahren
          erfolgt, sofern die Verarbeitung nicht für die Wahrnehmung einer Aufgabe erforderlich ist,
          die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, welche
          dem Verantwortlichen übertragen wurde.
        </Text>

        <Text mb="5">
          Ferner hat die betroffene Person bei der Ausübung ihres Rechts auf Datenübertragbarkeit
          gemäß Art. 20 Abs. 1 DS-GVO das Recht, zu erwirken, dass die personenbezogenen Daten
          direkt von einem Verantwortlichen an einen anderen Verantwortlichen übermittelt werden,
          soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten
          anderer Personen beeinträchtigt werden.
        </Text>

        <Text mb="5">
          Zur Geltendmachung des Rechts auf Datenübertragbarkeit kann sich die betroffene Person
          jederzeit an einen Mitarbeiter der {props.contactName} wenden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          g) Recht auf Widerspruch
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, aus Gründen, die sich aus
          ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender
          personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DS-GVO
          erfolgt, Widerspruch einzulegen. Dies gilt auch für ein auf diese Bestimmungen gestütztes
          Profiling.
        </Text>

        <Text mb="5">
          Die {props.contactName} verarbeitet die personenbezogenen Daten im Falle des Widerspruchs
          nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung
          nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person überwiegen,
          oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen.
        </Text>

        <Text mb="5">
          Verarbeitet die {props.contactName} personenbezogene Daten, um Direktwerbung zu betreiben,
          so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der
          personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch für das
          Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widerspricht die
          betroffene Person gegenüber der {props.contactName} der Verarbeitung für Zwecke der
          Direktwerbung, so wird die {props.contactName} die personenbezogenen Daten nicht mehr für
          diese Zwecke verarbeiten.
        </Text>

        <Text mb="5">
          Zudem hat die betroffene Person das Recht, aus Gründen, die sich aus ihrer besonderen
          Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei
          der {props.contactName} zu wissenschaftlichen oder historischen Forschungszwecken oder zu
          statistischen Zwecken gemäß Art. 89 Abs. 1 DS-GVO erfolgen, Widerspruch einzulegen, es sei
          denn, eine solche Verarbeitung ist zur Erfüllung einer im öffentlichen Interesse liegenden
          Aufgabe erforderlich.
        </Text>

        <Text mb="5">
          Zur Ausübung des Rechts auf Widerspruch kann sich die betroffene Person direkt an jeden
          Mitarbeiter der {props.contactName} oder einen anderen Mitarbeiter wenden. Der betroffenen
          Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der
          Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht
          mittels automatisierter Verfahren auszuüben, bei denen technische Spezifikationen
          verwendet werden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          h) Automatisierte Entscheidungen im Einzelfall einschließlich Profiling
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, nicht einer ausschließlich
          auf einer automatisierten Verarbeitung — einschließlich Profiling — beruhenden
          Entscheidung unterworfen zu werden, die ihr gegenüber rechtliche Wirkung entfaltet oder
          sie in ähnlicher Weise erheblich beeinträchtigt, sofern die Entscheidung (1) nicht für den
          Abschluss oder die Erfüllung eines Vertrags zwischen der betroffenen Person und dem
          Verantwortlichen erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder
          der Mitgliedstaaten, denen der Verantwortliche unterliegt, zulässig ist und diese
          Rechtsvorschriften angemessene Maßnahmen zur Wahrung der Rechte und Freiheiten sowie der
          berechtigten Interessen der betroffenen Person enthalten oder (3) mit ausdrücklicher
          Einwilligung der betroffenen Person erfolgt.
        </Text>

        <Text mb="5">
          Ist die Entscheidung (1) für den Abschluss oder die Erfüllung eines Vertrags zwischen der
          betroffenen Person und dem Verantwortlichen erforderlich oder (2) erfolgt sie mit
          ausdrücklicher Einwilligung der betroffenen Person, trifft die {props.contactName}{' '}
          angemessene Maßnahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der
          betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens
          einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf
          Anfechtung der Entscheidung gehört.
        </Text>

        <Text mb="5">
          Möchte die betroffene Person Rechte mit Bezug auf automatisierte Entscheidungen geltend
          machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung
          Verantwortlichen wenden.
        </Text>
      </ListItem>
      <ListItem mb="5">
        <Heading size="md" mb="2">
          i) Recht auf Widerruf einer datenschutzrechtlichen Einwilligung
        </Heading>
        <Text mb="5">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom
          Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, eine Einwilligung zur
          Verarbeitung personenbezogener Daten jederzeit zu widerrufen.
        </Text>

        <Text mb="5">
          Möchte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen,
          kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung
          Verantwortlichen wenden.
        </Text>
      </ListItem>
    </List>
    <Heading size="md" mb="2">
      6. Rechtsgrundlage der Verarbeitung
    </Heading>
    <Text mb="5">
      Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage für
      Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen bestimmten Verarbeitungszweck
      einholen. Ist die Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrags, dessen
      Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei
      Verarbeitungsvorgängen der Fall ist, die für eine Lieferung von Waren oder die Erbringung
      einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf
      Art. 6 I lit. b DS-GVO. Gleiches gilt für solche Verarbeitungsvorgänge die zur Durchführung
      vorvertraglicher Maßnahmen erforderlich sind, etwa in Fällen von Anfragen zur unseren
      Produkten oder Leistungen. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch
      welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur
      Erfüllung steuerlicher Pflichten, so basiert die Verarbeitung auf Art. 6 I lit. c DS-GVO. In
      seltenen Fällen könnte die Verarbeitung von personenbezogenen Daten erforderlich werden, um
      lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu
      schützen. Dies wäre beispielsweise der Fall, wenn ein Besucher in unserem Betrieb verletzt
      werden würde und daraufhin sein Name, sein Alter, seine Krankenkassendaten oder sonstige
      lebenswichtige Informationen an einen Arzt, ein Krankenhaus oder sonstige Dritte weitergegeben
      werden müssten. Dann würde die Verarbeitung auf Art. 6 I lit. d DS-GVO beruhen. Letztlich
      könnten Verarbeitungsvorgänge auf Art. 6 I lit. f DS-GVO beruhen. Auf dieser Rechtsgrundlage
      basieren Verarbeitungsvorgänge, die von keiner der vorgenannten Rechtsgrundlagen erfasst
      werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens
      oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten
      des Betroffenen nicht überwiegen. Solche Verarbeitungsvorgänge sind uns insbesondere deshalb
      gestattet, weil sie durch den Europäischen Gesetzgeber besonders erwähnt wurden. Er vertrat
      insoweit die Auffassung, dass ein berechtigtes Interesse anzunehmen sein könnte, wenn die
      betroffene Person ein Kunde des Verantwortlichen ist (Erwägungsgrund 47 Satz 2 DS-GVO).
    </Text>

    <Heading size="md" mb="2">
      7. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten
      verfolgt werden
    </Heading>
    <Text mb="5">
      Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser
      berechtigtes Interesse die Durchführung unserer Geschäftstätigkeit zugunsten des Wohlergehens
      all unserer Mitarbeiter und unserer Anteilseigner.
    </Text>

    <Heading size="md" mb="2">
      8. Dauer, für die die personenbezogenen Daten gespeichert werden
    </Heading>
    <Text mb="5">
      Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige
      gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten
      routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung
      erforderlich sind.
    </Text>

    <Heading size="md" mb="2">
      9. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten;
      Erforderlichkeit für den Vertragsabschluss; Verpflichtung der betroffenen Person, die
      personenbezogenen Daten bereitzustellen; mögliche Folgen der Nichtbereitstellung
    </Heading>
    <Text mb="5">
      Wir klären Sie darüber auf, dass die Bereitstellung personenbezogener Daten zum Teil
      gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen
      Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem
      Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur
      Verfügung stellt, die in der Folge durch uns verarbeitet werden müssen. Die betroffene Person
      ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser
      Unternehmen mit ihr einen Vertrag abschließt. Eine Nichtbereitstellung der personenbezogenen
      Daten hätte zur Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden könnte.
      Vor einer Bereitstellung personenbezogener Daten durch den Betroffenen muss sich der
      Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter klärt den Betroffenen
      einzelfallbezogen darüber auf, ob die Bereitstellung der personenbezogenen Daten gesetzlich
      oder vertraglich vorgeschrieben oder für den Vertragsabschluss erforderlich ist, ob eine
      Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die
      Nichtbereitstellung der personenbezogenen Daten hätte.
    </Text>

    <Heading size="md" mb="2">
      10. Bestehen einer automatisierten Entscheidungsfindung
    </Heading>
    <Text mb="5">
      Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische
      Entscheidungsfindung oder ein Profiling.
    </Text>

    <Text mb="5">
      Entwickelt von den
      <Link href="https://willing-able.com/" px="1" textDecoration="underline">
        Legal Tech
      </Link>
      Spezialisten von Willing & Able, die auch das System für das digitale
      <Link href="https://abletorecords.com/" px="1" textDecoration="underline">
        Verarbeitungsverzeichnis
      </Link>
      entwickelt haben. Die Texte des Datenschutzerklärungs-Generators wurden von
      <Link href="https://dg-datenschutz.de/" px="1" textDecoration="underline">
        Prof. Dr. h.c. Heiko Jonny Maniero
      </Link>
      und Rechtsanwalt
      <Link href="https://www.wbs-law.de/" rel="nofollow" px="1" textDecoration="underline">
        Christian Solmecke
      </Link>
      erstellt und publiziert.
    </Text>
  </>
)

const PrivacyPage = () => {
  const [lang, setLang] = useState<string>('')

  useEffect(() => {
    const preferredLanguage = localStorage.getItem('i18nextLng')?.substring(0, 2) ?? 'en'
    setLang(preferredLanguage)
  }, [])

  const props = {
    contactName: process.env.NEXT_PUBLIC_CONTACT_NAME as string,
    contactAddress: process.env.NEXT_PUBLIC_CONTACT_ADDRESS as string,
    contactAddressCity: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_CITY as string,
    contactAddressCountry: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY as string,
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL as string,
    contactWebsite: process.env.NEXT_PUBLIC_CONTACT_WEBSITE as string,
  }

  return (
    <>
      <PageMeta allowIndex={false} />
      <Container marginTop={10}>
        <Header showMenu={false} />

        <Heading mb="5">Privacy Policy</Heading>

        {lang == 'de' ? <PrivacyDE {...props} /> : <PrivacyEN {...props} />}

        <Footer />
      </Container>
    </>
  )
}

export default PrivacyPage
