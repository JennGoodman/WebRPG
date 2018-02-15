package com.revature.americaonwine.data;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;

import com.revature.americaonwine.beans.Brand;
import com.revature.americaonwine.util.HibernateUtil;

public class BrandSpring implements BrandDao {

	@Autowired
	HibernateUtil hu;
	Logger log = Logger.getLogger(this.getClass());
	Session s = hu.getSession();
	
	@Override
	public Brand save(Brand brand) {
		log.trace(this.getClass() + " Called:  save(Brand brand)");
		s.save(brand);
		return brand;
	}

	@Override
	public List<Brand> getAll() {
		log.trace(this.getClass() + " Called: getAll()");
		String query = "from com.revature.americaonwine.beans.Brand";
		Query<Brand> q = s.createQuery(query, Brand.class);
		return q.getResultList();
	}

	@Override
	public Brand update(Brand brand) {
		log.trace(this.getClass() + " Called:  update(Brand brand)");
		s.update(brand);
		return brand;
	}

	@Override
	public void delete(Brand brand) {
		log.trace(this.getClass() + " Called:  delete(Brand brand)");
		s.delete(brand);
	}
}
